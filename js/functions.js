const printResults = (...args) => {
  for (let i = 0; i < args.length / 2; i++) {
    console.log(args[i * 2], args[i * 2 + 1]);
  }
};

const checkTime = (beginOfDay, endOfDay, startOfMeet, duration) => {
  beginOfDay = Number(beginOfDay.replace(':', '.'));
  endOfDay = Number(endOfDay.replace(':', '.'));
  startOfMeet = Number(startOfMeet.replace(':', '.'));
  const workNormal = endOfDay - beginOfDay;
  const workHard = (startOfMeet - beginOfDay) + duration / 60;

  return Boolean(workHard <= workNormal && startOfMeet >= beginOfDay);
};

printResults(
  'имяФункции(\'08:00\', \'17:30\', \'14:00\', 90) = ', checkTime('08:00', '17:30', '14:00', 90),
  'имяФункции(\'8:0\', \'10:0\', \'8:0\', 120) = ', checkTime('8:0', '10:0', '8:0', 120),
  'имяФункции(\'08:00\', \'14:30\', \'14:00\', 90) = ', checkTime('08:00', '14:30', '14:00', 90),
  'имяФункции(\'14:00\', \'17:30\', \'08:0\', 90) = ', checkTime('14:00', '17:30', '08:0', 90),
  'имяФункции(\'8:00\', \'17:30\', \'08:00\', 900) = ', checkTime('8:00', '17:30', '08:00', 900),
);
