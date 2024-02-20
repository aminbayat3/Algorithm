
export const calculateEnergyRecursive = (r, c, n, total, energyArray, m = 0) => {
    if(m === (r.length - 1)) {
        return 0;
    } 
    let current = (r[m + 1] - r[m]) * (c / n); 
    total += current; 
    energyArray.push(total);
    total = (r[m + 1] - r[m]) * (c / (n)) + calculateEnergyRecursive(r, c, n-1, total, energyArray, m+1);

    return energyArray;
}

export const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// Here we can use one of the sorting algorithms like quick sort or merge sort, but here I used the built-in javascript method called "sort"
export const sortCarsByHourToFull = (carsData) => { 
    return carsData.sort((a, b) => a.hourToFull - b.hourToFull);
  }

export const getRemainingTimes = (carsData) => {
    return carsData.map((car) => car.hourToFull);
}
  