
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

export const calculateReadyTimesWithDifferentPluginTimes = (r, pluginTimes, c, n, maxChargeCapacity = 11) => {
  let total = 0;
  let leftEnergyArray = [r[0]];
  let readyTimeArray = [];
  let j = 0;

  for(let i=0; i < n; i++) {
    const possibleReadyTime = r[i]/Math.min((c/leftEnergyArray.length), maxChargeCapacity);
    const pluginTimesDiff = pluginTimes[i+1] - pluginTimes[i];
   if(pluginTimesDiff >= possibleReadyTime) {
      readyTimeArray.push(possibleReadyTime);
      leftEnergyArray.shift(); // removing the first element from the array
   } else {
    const leftEnergy = r[i] - (pluginTimesDiff * Math.min(c/leftEnergyArray.length, maxChargeCapacity));
    leftEnergyArray.push(leftEnergy);
    leftEnergyArray = leftEnergyArray.sort((a, b) => a - b);
   }
  }
}

export const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// Here we can use one of the sorting algorithms like quick sort or merge sort, but here I used the built-in javascript method called "sort"
export const sortCarsByRequiredEnergy = (carsData) => { 
    return carsData.sort((a, b) => a.energyRequired - b.energyRequired);
  }

export const getEnergyRequired = (carsData) => {
    return carsData.map((car) => car.energyRequired);
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
  