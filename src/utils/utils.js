import dayjs from "dayjs";

export const isSameOrAfter = (time1, time2) => {
  return time1.isAfter(time2) || time1.isSame(time2);
}

export const isSameOrBefore = (time1, time2) => {
    return time1.isBefore(time2) || time1.isSame(time2);
}


// Generates a random number between min (inclusive) and max (inclusive).
export const generateRandomInteger = (min, max) => {
  // Ensure that min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Generates a random date between two dayjs dates.
export const getRandomDateBetween = (start, end) => {
  // Convert the dayjs objects to milliseconds
  const startMillis = start.valueOf();
  const endMillis = end.valueOf();
  
  // Generate a random time in milliseconds between the start and end times
  const randomMillis = startMillis + Math.random() * (endMillis - startMillis);
  
  // Convert the random milliseconds back to a dayjs object and return
  const randomDateTime = dayjs(randomMillis);
  return randomDateTime;
}