import moment from "moment";

export const getDisabledDates = (startDate, endDate, daysToDisable) => {
  const disabledDates = {};
  const start = moment(startDate);
  const end = moment(endDate);
  for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
    if (daysToDisable.includes(m.weekday())) {
      disabledDates[m.format('YYYY-MM-DD')] = {disabled: true};
    }
  }
  return disabledDates;
}
