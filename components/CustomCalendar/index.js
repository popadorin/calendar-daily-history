import React from 'react';
import {Calendar} from 'react-native-calendars';
import {getDisabledDates} from './getDisabledDates';

// Should be configured in a separate file
const startDate = '2015-01-01';
const endDate = '2023-12-31';
const disabledDaysIndexes = [1, 5, 6]; // Tuesday, Saturday and Sunday
const disabledDates = getDisabledDates(startDate, endDate, disabledDaysIndexes);

export const CustomCalendar = ({setDayQuery, setModalVisible}) => {
  return (
    <Calendar
      disableAllTouchEventsForDisabledDays
      onDayPress={(day) => {
        setDayQuery({day: day.day, month: day.month});
        setModalVisible(true);
      }}
      markedDates={{...disabledDates}}
    />
  )
}
