
import dayjs from "dayjs";
import { CONNECTED_LOAD } from "./data";

export const calculateReadyTimes = (r, c, n, total, readyTimeArray, m=0, maxChargeCapacity = 11) => {
    if(m === (r.length - 1)) {
        return 0;
    } 
    let current =  (r[m + 1] - r[m]) / Math.min((c / n), maxChargeCapacity)
    total += current; 
    readyTimeArray.push(total);
    total = (r[m + 1] - r[m]) / Math.min((c / n), maxChargeCapacity) + calculateReadyTimes(r, c, n-1, total, readyTimeArray, m+1);
   
    return readyTimeArray;
}

export const calculateReadyTimesWithForLoop = (r, c, n,  maxChargeCapacity = 11) => {
  let total = 0;
  let readyTimeArray = [];
  for(let i=0; i < r.length - 1; i++) {
   total += (r[i+1] - r[i]) / Math.min((c/n), maxChargeCapacity);
   readyTimeArray.push(total);
   n--;
  }

  return readyTimeArray;
}

export const generateTwoDayTimestamps = (startTime, endTime, intervalDuration) => {
  const intervals = [];
  let currentTime = dayjs(startTime); // Start from the exact date and time provided 

  let counter = 1;

  while (currentTime.isBefore(endTime)) {
    const start = currentTime;
    const end = currentTime.add(intervalDuration, 'minutes');
    intervals.push({
      number: counter,
      start: start,
      end: end,
    });
    currentTime = end;
    counter++;
  }

  return intervals;
}

const isSameOrAfter = (time1, time2) => {
  return time1.isAfter(time2) || time1.isSame(time2);
}

export const calculateCarsDataSimulation = (carsData, startTime, endTime, intervalDuration, connectedCars) => {
  const intervals = generateTwoDayTimestamps(startTime, endTime, intervalDuration);

  let j = 0;

  for(let i = 0; i < intervals.length; i++) { 
    const plugedInCar = carsData.find(car => !car.isPlugedIn && isSameOrAfter(intervals[i].end, car.plugInTime));
    const plugedOutCar = carsData.find(car => !car.isPlugedOut && isSameOrAfter(intervals[i].end, car.plugOutTime));
    const carNeedMet = carsData.find(car => !car.isNeedMet && car.soc >= car.energyRequired);
    if(plugedInCar) { 
      plugedInCar.isPlugedIn = true;
      connectedCars.push(plugedInCar);
      break;
    }
    if(plugedOutCar) { // plug out
      plugedOutCar.isPlugedOut = true;
      connectedCars = connectedCars.filter(car => car.name !== plugedOutCar.name);
      break;
    }
     if(carNeedMet) { // need met
      carNeedMet.isNeedMet = true;
      carNeedMet.fulfilledTime = intervals[i].start;
      break;
    }
    
    const standByCars = connectedCars.map(car => { 
      if(car.isNeedMet) return car;
    });

    const chargingNeededCars = connectedCars.map(car => {
      if(!car.isNeedMet) return car;
    });

    // this variable indicates how much of the connection load will be consumed by the cars that their need is not fulfilled, then we check if this amount is less than the total connection load, we can assign the rest to the standBy cars.
    let totalCharginLoad = 0;

    chargingNeededCars.length > 0 && chargingNeededCars.forEach(car => {
      const minimumChargeLoad =  Math.min(CONNECTED_LOAD/chargingNeededCars.length, car.maxAcConnectionLoad);
      car.soc += intervalDuration/60 * minimumChargeLoad;
      totalCharginLoad +=  minimumChargeLoad;
    });

    const chargingLoadDiff = CONNECTED_LOAD - totalCharginLoad;

    if(chargingLoadDiff > 0) {
      standByCars.forEach(car => {
        car.soc += intervalDuration/60 * Math.min(chargingLoadDiff/standByCars.length, car.maxAcConnectionLoad);
      });
    }

    j++;
  }

  j < intervals.length && calculateCarsDataSimulation(carsData, intervals[j].end, endTime, intervalDuration, connectedCars);

  return carsData;
}

export const calculateReadyTimesWithSimulationFirstTry = (r, c, n, plugInTime, intervalDuration, maxChargeCapacity = 11) => {
  debugger;
  const intervals = generateTwoDayTimestamps(plugInTime, intervalDuration);
  let j = 0;
  let k = n;
  let total = 0;
  let readyTimeArray = [];


  for(let i = 0; i < intervals.length; i++) {
    if(j === n) {
      return readyTimeArray;
    }

    if(total >= r[j]) {
      readyTimeArray.push(intervals[i].end);
      k--;
      j++;
      continue;
    } 

    total += intervalDuration/60 * Math.min(c/k, maxChargeCapacity);
    intervals[i].energy = total;

    if(intervals[i].energy >= r[j]) {
      readyTimeArray.push(intervals[i].end.format('YYYY.MM.DD HH:mm'));
      k--;
      j++;
    }
  }
}

// export const calculateReadyTimesWithDifferentPluginTimes = (r, pluginTimes, c, n, maxChargeCapacity = 11) => {
//   debugger;
//   let leftEnergyArray = [];
//   let readyTimeArray = [];
//   let extrahours = 0;

//   for(let i=0; i < n; i++) {
//     leftEnergyArray.push(r[i]);
//     if(leftEnergyArray.length > 1) leftEnergyArray = leftEnergyArray.sort((a, b) => a - b);
//     if(i === n-1) break;
//     const possibleReadyTime = leftEnergyArray[0]/Math.min((c/leftEnergyArray.length), maxChargeCapacity);
//     const pluginTimesDiff = dayjs(pluginTimes[i+1]).diff(dayjs(pluginTimes[i]), 'hour');
//    if(pluginTimesDiff >= possibleReadyTime) {
//       readyTimeArray.length > 0 ? readyTimeArray.push(possibleReadyTime + readyTimeArray[readyTimeArray.length-1] + extrahours) : readyTimeArray.push(possibleReadyTime + extrahours);
//       extrahours = (pluginTimesDiff - possibleReadyTime);
//       if(leftEnergyArray.length > 1) {
//         const leftEnergyFirstElement = leftEnergyArray[0];
//         for(let m = 0; m < leftEnergyArray.length; m++) {
//           leftEnergyArray[m] = leftEnergyArray[m] - leftEnergyFirstElement;
//         }
//       }
//       leftEnergyArray.shift(); // removing the first element from the array
//    } else if(pluginTimesDiff < possibleReadyTime) { // we can add an or condition here
//     const leftEnergy = leftEnergyArray[0] - (pluginTimesDiff * Math.min(c/leftEnergyArray.length, maxChargeCapacity));
//     leftEnergyArray.push(leftEnergy);
//     extrahours += pluginTimesDiff;
//     leftEnergyArray.shift();
//    }
//   }
  
//   let newRemainingEnergyArray = [0, ...leftEnergyArray];
//   let j = leftEnergyArray.length;
//   let total = readyTimeArray[readyTimeArray.length-1] + extrahours;

//   for(let k=0; k < newRemainingEnergyArray.length - 1; k++) {
//       total += (newRemainingEnergyArray[k + 1] - newRemainingEnergyArray[k]) / Math.min((c/j), maxChargeCapacity);
//       readyTimeArray.push(total);
//       j--;
//   }

//   return readyTimeArray;
// }

export const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sortByTime = (events) => {
  return events.sort((event1, event2) => getTimeDifference(event1.time, event2.time));
}

// Here we can use one of the sorting algorithms like quick sort or merge sort, but here I used the built-in javascript method called "sort"
export const sortCarsByRequiredEnergy = (carsData) => { 
    return carsData.sort((a, b) => a.energyRequired - b.energyRequired);
  }

export const sortCarsByPluginTime = (carsData) => {
  return carsData.sort((a, b) => getTimeDifference(a.plugInTime, b.plugInTime));
}

export const getEnergyRequired = (carsData) => {
    return carsData.map((car) => car.energyRequired);
}

export const getPluginTimes = (carsData) => {
  return carsData.map((car) => car.plugInTime);
}

export const getTimeDifference = (time1, time2) => {
  return time1.diff(time2, "minute");
}

// export const calculateReadyTimes = (r, c, n, total, readyTimeArray, m = 0, maxChargeCapacity = 11) => {
//   if(m === (r.length - 1)) {
//       return 0;
//   } 
//   let current = (r[m + 1] - r[m]) * Math.min((c / n), maxChargeCapacity); 
//   total += current; 
//   readyTimeArray.push(total);
//   total = (r[m + 1] - r[m]) * Math.min((c / n), maxChargeCapacity) + calculateReadyTimes(r, c, n-1, total, readyTimeArray, m+1);

//   return readyTimeArray;
// }
  