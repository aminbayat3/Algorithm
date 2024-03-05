
import dayjs from "dayjs";

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

const generateWeeklyTimestamps = (startDay, intervalDuration) => {
  const intervals = [];
  let currentTime = dayjs(startDay); // Start from the exact date and time provided
  const endTime = currentTime.add(7, 'day'); // End time is one week from the start time

  while (currentTime.isBefore(endTime)) {
    const start = currentTime;
    const end = currentTime.add(intervalDuration, 'minutes');
    intervals.push({
      start: start,
      end: end,
      energy: 0,
    });
    currentTime = end;
  }

  return intervals;
}

export const calculateReadyTimesWithSimulation = (r, c, n, plugInTime, intervalDuration, maxChargeCapacity = 11) => {
  debugger;
  const intervals = generateWeeklyTimestamps(plugInTime, intervalDuration);
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

export const calculateReadyTimesWithDifferentPluginTimes = (r, pluginTimes, c, n, maxChargeCapacity = 11) => {
  debugger;
  let leftEnergyArray = [];
  let readyTimeArray = [];
  let extrahours = 0;

  for(let i=0; i < n; i++) {
    leftEnergyArray.push(r[i]);
    if(leftEnergyArray.length > 1) leftEnergyArray = leftEnergyArray.sort((a, b) => a - b);
    if(i === n-1) break;
    const possibleReadyTime = leftEnergyArray[0]/Math.min((c/leftEnergyArray.length), maxChargeCapacity);
    const pluginTimesDiff = dayjs(pluginTimes[i+1]).diff(dayjs(pluginTimes[i]), 'hour');
   if(pluginTimesDiff >= possibleReadyTime) {
      readyTimeArray.length > 0 ? readyTimeArray.push(possibleReadyTime + readyTimeArray[readyTimeArray.length-1] + extrahours) : readyTimeArray.push(possibleReadyTime + extrahours);
      extrahours = (pluginTimesDiff - possibleReadyTime);
      if(leftEnergyArray.length > 1) {
        const leftEnergyFirstElement = leftEnergyArray[0];
        for(let m = 0; m < leftEnergyArray.length; m++) {
          leftEnergyArray[m] = leftEnergyArray[m] - leftEnergyFirstElement;
        }
      }
      leftEnergyArray.shift(); // removing the first element from the array
   } else if(pluginTimesDiff < possibleReadyTime) { // we can add an or condition here
    const leftEnergy = leftEnergyArray[0] - (pluginTimesDiff * Math.min(c/leftEnergyArray.length, maxChargeCapacity));
    leftEnergyArray.push(leftEnergy);
    extrahours += pluginTimesDiff;
    leftEnergyArray.shift();
   }
  }
  
  let newRemainingEnergyArray = [0, ...leftEnergyArray];
  let j = leftEnergyArray.length;
  let total = readyTimeArray[readyTimeArray.length-1] + extrahours;

  for(let k=0; k < newRemainingEnergyArray.length - 1; k++) {
      total += (newRemainingEnergyArray[k + 1] - newRemainingEnergyArray[k]) / Math.min((c/j), maxChargeCapacity);
      readyTimeArray.push(total);
      j--;
  }

  return readyTimeArray;
}

export const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
  