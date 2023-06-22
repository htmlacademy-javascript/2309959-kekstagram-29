const checkTime = (beginOfDay, endOfDay, startOfMeet, duration) => {
  beginOfDay = Number(beginOfDay.replace(':', '.'));
  endOfDay = Number(endOfDay.replace(':', '.'));
  startOfMeet = Number(startOfMeet.replace(':', '.'));
  const workNormal = endOfDay - beginOfDay;
  const workHard = (startOfMeet - beginOfDay) + duration / 60;

  return Boolean(workHard <= workNormal && startOfMeet >= beginOfDay);
};

checkTime('8:0', '10:0', '8:0', 120); // true
