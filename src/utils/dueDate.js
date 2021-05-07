import moment from 'moment';

export const getDueToday = () => {
  return moment().startOf('day');
}

export const getDueTomorrow = () => {
  return moment().add(1, 'days').startOf('day');
}

export const getDueNextWeek = () => {
  return moment().day(8).startOf('day');
}