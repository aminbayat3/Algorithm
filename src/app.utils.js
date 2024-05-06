
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

  