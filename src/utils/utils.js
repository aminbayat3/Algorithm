export const isSameOrAfter = (time1, time2) => {
  return time1.isAfter(time2) || time1.isSame(time2);
}

export const isSameOrBefore = (time1, time2) => {
    return time1.isBefore(time2) || time1.isSame(time2);
}