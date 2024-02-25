
export const calculateReadyTimes = (r, c, n, total, readyTimeArray, m = 0, maxChargeCapacity = 11) => {
    if(m === (r.length - 1)) {
        return 0;
    } 
    let current = (r[m + 1] - r[m]) * Math.min((c / n), maxChargeCapacity); 
    total += current; 
    readyTimeArray.push(total);
    total = (r[m + 1] - r[m]) * Math.min((c / n), maxChargeCapacity) + calculateReadyTimes(r, c, n-1, total, readyTimeArray, m+1);

    return readyTimeArray;
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
  