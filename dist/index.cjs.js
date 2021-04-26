'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var dateFns = require('date-fns');
require('react-calendar/dist/Calendar.css');
var Calendar = require('react-calendar');
var rgba = require('color-rgba');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Calendar__default = /*#__PURE__*/_interopDefaultLegacy(Calendar);
var rgba__default = /*#__PURE__*/_interopDefaultLegacy(rgba);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const Arrow = ({ direction }) => (React__namespace.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "26", height: "26", viewBox: "0 0 512 512" },
    React__namespace.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: direction === "back" ? "M328 112L184 256l144 144" : "M184.001 400L328.001 256L184.001 112" })));

const StyledCalendar = styled__default['default'](Calendar__default['default']) `
  .day-tile {
    width: 60px;
    height: 60px;
    @media (max-width: 768px) {
      height: 45px;
    }
    color: rgb(167, 167, 167);
    padding: 5px;
    position: relative;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      bottom: 2px;
      right: 2px;
      z-index: -1;
    }
  }

  .day-tile abbr {
    font-weight: bold;
    font-size: 15.33px;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: rgb(218, 218, 218);
  }

  .react-calendar button {
    margin-top: 2.5px !important;
    margin-bottom: 2.5px !important;
  }

  .active-day-tile {
    &::after {
      background: ${({ primaryColorFaded }) => primaryColorFaded};
      border-radius: ${({ borderRadius }) => borderRadius}px;
    }
    color: ${({ primaryColor }) => primaryColor};
  }

  .active-day-tile:hover {
    opacity: 0.5;
  }

  .react-calendar__tile:disabled.day-tile {
    background-color: #fff;
  }

  .react-calendar__tile--now.day-tile {
    background: #fff;
    &::after {
      border-radius: ${({ borderRadius }) => borderRadius}px;
      background: ${({ primaryColorToday }) => primaryColorToday};
    }
  }

  .react-calendar__tile--now:hover.day-tile {
    background: #fff;
    &::after {
      border-radius: ${({ borderRadius }) => borderRadius}px;
      background: ${({ primaryColorToday }) => primaryColorToday};
    }
  }

  .react-calendar__tile:hover.day-tile {
    background: #fff;
  }

  .react-calendar__tile--active.day-tile {
    background: #fff;
    color: ${({ primaryColor }) => primaryColor};
    &::after {
      border-radius: ${({ borderRadius }) => borderRadius}px;
      border: solid ${({ primaryColorToday }) => primaryColorToday} 1px;
    }
  }

  .react-calendar__tile--active:enabled.day-tile,
  .react-calendar__tile--active:enabled:focus.day-tile {
    &::after {
      background: ${({ primaryColorFaded }) => primaryColorFaded};
      border-radius: ${({ borderRadius }) => borderRadius}px;
      border: solid ${({ primaryColor }) => primaryColor} 1px;
    }
    &.react-calendar__tile--now {
      &::after {
        background: ${({ primaryColorToday }) => primaryColorToday};
      }
    }
  }

  /* month day titles */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: normal;
    color: #333;
    font-size: 14px;
    font-weight: 700;
  }

  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    color: #333;
  }

  /* calendar styles */
  &.react-calendar {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    border: none !important;
    width: 100% !important;
    min-height: 390px;
    @media (max-width: 768px) {
      min-height: 302px;
    }
  }
`;
const formatDate = (date) => {
    return dateFns.format(date, 'MM/dd/yyyy');
};
const ScheduleCalendar = ({ availableTimeslots, onDaySelected, selectedDay, borderRadius, primaryColor, primaryColorFaded, }) => {
    const [daysAvailable, setDaysAvailable] = React.useState([]);
    const [r, g, b, alpha] = rgba__default['default'](primaryColor) || [0, 0, 0, 1];
    const primaryColorToday = `rgba(${r},${g},${b},${alpha / 4.5})`;
    React.useEffect(() => {
        const daysInTimeslots = availableTimeslots.map((slot) => {
            if (!dateFns.isValid(new Date(slot.startTime)))
                throw new Error(`Invalid date for start time on slot ${slot.id}`);
            if (!dateFns.isValid(new Date(slot.endTime)))
                throw new Error(`Invalid date for end time on slot ${slot.id}`);
            const startTimeDay = dateFns.getDay(new Date(slot.startTime));
            const endTimeDay = dateFns.getDay(new Date(slot.endTime));
            if (startTimeDay !== endTimeDay)
                throw new Error('Days should match in Timeslot start and end time' + startTimeDay.toString + ' | ' + endTimeDay.toString);
            return formatDate(new Date(slot.startTime));
        });
        setDaysAvailable([...new Set(daysInTimeslots)]);
    }, [availableTimeslots]);
    const _onClickDay = (day) => {
        onDaySelected(day);
    };
    const _isTileDisabled = (props) => {
        return props.view === 'month' && !daysAvailable.some((date) => date === formatDate(props.date));
    };
    const _renderClassName = (props) => {
        if (daysAvailable.some((date) => date === formatDate(props.date)))
            return ['day-tile', 'active-day-tile'];
        return (props.view === 'month' && 'day-tile') || null;
    };
    return (React__default['default'].createElement(StyledCalendar, { borderRadius: borderRadius, primaryColor: primaryColor, primaryColorFaded: primaryColorFaded, primaryColorToday: primaryColorToday, defaultView: 'month', onClickDay: _onClickDay, showNavigation: false, tileDisabled: _isTileDisabled, tileClassName: _renderClassName, value: selectedDay, activeStartDate: dateFns.startOfMonth(selectedDay) }));
};

const Container$2 = styled__default['default'].div `
  display: flex;
  width: 100%;
  align-items: center;
`;
const Button = styled__default['default'].button `
  padding: 16px;
  border: none;
  color: ${({ selected }) => (selected ? `rgb(255, 255, 255)` : `rgb(20,20,20)`)};
  background-color: ${({ selected, primaryColor }) => (selected ? primaryColor : `rgba(0,0,0,0)`)};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  :hover {
    opacity: 0.8;
    background-color: ${({ selected, primaryColor, primaryColorFaded }) => selected ? primaryColor : primaryColorFaded};
  }
`;
const CancelButton = styled__default['default'].button `
  padding: 8px 24px;
  border: none;
  background-color: rgb(0, 0, 0, 0);
  border-radius: ${({ borderRadius }) => borderRadius}px;
  outline: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 100%;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
const EventListItem = ({ onStartTimeSelect, startTimeEvent, selected, onCancelClicked, borderRadius, primaryColor, primaryColorFaded, }) => {
    return (React__default['default'].createElement(Container$2, null,
        React__default['default'].createElement(Button, { selected: Boolean(selected), borderRadius: borderRadius, primaryColorFaded: primaryColorFaded, primaryColor: primaryColor, onClick: onStartTimeSelect },
            selected && 'Confirm ',
            dateFns.format(startTimeEvent.startTime, 'h:mm a')),
        selected && (React__default['default'].createElement(CancelButton, { borderRadius: borderRadius, onClick: onCancelClicked }, "Cancel"))));
};

const Container$1 = styled__default['default'].div `
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`;
const ScrollEdgeFade = styled__default['default'].div `
  position: absolute;
  width: 100%;
  height: 24px;
  left: 0;
  right: 0;
  z-index: 12;
  pointer-events: none;
  &.top {
    background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0));
    top: 42px;
  }
  &.bottom {
    bottom: 0;
    background: linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0));
  }
`;
const ListItemDivider = styled__default['default'].div `
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({ makeTransparent }) => (makeTransparent ? `transparent` : `rgba(0, 0, 0, 0.05)`)};
`;
const StyledP = styled__default['default'].p `
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
`;
const NoTimesAvailableContainer = styled__default['default'].div `
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EventList = ({ startTimeListItems = [], onStartTimeSelect, emptyListContentEl, borderRadius, primaryColorFaded, primaryColor, }) => {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(-1);
    const _onStartTimeSelect = (startTimeEvent, index) => {
        if (selectedItemIndex === index) {
            onStartTimeSelect(startTimeEvent);
        }
        else {
            setSelectedItemIndex(index);
        }
    };
    const emptyListElement = emptyListContentEl || (React__default['default'].createElement(NoTimesAvailableContainer, null,
        React__default['default'].createElement(StyledP, null, "No times available")));
    return (React__default['default'].createElement(React__default['default'].Fragment, null, startTimeListItems.length === 0 ? (emptyListElement) : (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(ScrollEdgeFade, { className: "top" }),
        React__default['default'].createElement(ScrollEdgeFade, { className: "bottom" }),
        React__default['default'].createElement(Container$1, null, startTimeListItems.map((startTimeEvent, i) => (React__default['default'].createElement(React__default['default'].Fragment, { key: i },
            React__default['default'].createElement(EventListItem, { primaryColorFaded: primaryColorFaded, borderRadius: borderRadius, primaryColor: primaryColor, onCancelClicked: () => setSelectedItemIndex(-1), selected: i === selectedItemIndex, startTimeEvent: startTimeEvent, onStartTimeSelect: () => _onStartTimeSelect(startTimeEvent, i) }),
            i !== startTimeListItems.length - 1 && (React__default['default'].createElement(ListItemDivider, { makeTransparent: selectedItemIndex === i || selectedItemIndex === i + 1 }))))))))));
};

const Container = styled__default['default'].div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Inner = styled__default['default'].div `
  display: flex;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  box-shadow: 0 5px 22px rgba(20, 21, 21, 0.22), 0px 1px 4px rgba(20, 21, 21, 0.14);
  padding: 16px;
  margin: 16px;
  flex-direction: column;
  background: white;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px;
  }
`;
const Divider = styled__default['default'].div `
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`;
const CalendarContainer = styled__default['default'].div `
  flex: 1;
`;
const StartTimeListContainer = styled__default['default'].div `
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`;
const StartTimeListContainerAbsolute = styled__default['default'].div `
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const SelectedDayTitle = styled__default['default'].h3 `
  margin: 0;
  padding: 0;
  font-weight: 700;
`;
const Header = styled__default['default'].div `
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;
const ArrowButton = styled__default['default'].button `
  outline: none;
  background: none;
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  opacity: 0.4;
  margin: 0;
  &:hover {
    opacity: 0.7;
    background: rgba(0, 0, 0, 0.03);
  }
`;
const ScheduleMeeting = ({ availableTimeslots = [], borderRadius = 0, primaryColor = '#3f5b85', emptyListContentEl, eventStartTimeSpreadInMinutes = 0, eventDurationInMinutes = 30, onSelectedDayChange, onStartTimeSelect, scheduleMeetingStyles, initialDisplayDay, }) => {
    const [r, g, b, alpha] = rgba__default['default'](primaryColor) || [0, 0, 0, 1];
    const primaryColorRGB = `rgba(${r},${g},${b},${alpha})`;
    const primaryColorFaded = `rgba(${r},${g},${b},${alpha / 9})`;
    const [selectedDay, setSelectedDay] = React__default['default'].useState(new Date());
    const [startTimeEventsList, setStartTimeEventsList] = React__default['default'].useState([]);
    const [selectedDayStartTimeEventsList, setSelectedDayStartTimeEventsList] = React__default['default'].useState([]);
    const onDaySelected = (day) => {
        setSelectedDay(day);
        onSelectedDayChange && onSelectedDayChange(day);
    };
    const splitTimeslot = (startTimeEvent) => {
        const splitTimeslots = [null, null];
        const minutesIntoTimeslotEventWillStart = dateFns.differenceInMinutes(startTimeEvent.startTime, new Date(startTimeEvent.availableTimeslot.startTime));
        if (minutesIntoTimeslotEventWillStart !== 0) {
            const newFirstTimeslot = {
                oldId: startTimeEvent.availableTimeslot.id,
                startTime: startTimeEvent.availableTimeslot.startTime,
                endTime: dateFns.addMinutes(new Date(startTimeEvent.availableTimeslot.startTime), minutesIntoTimeslotEventWillStart),
            };
            splitTimeslots[0] = newFirstTimeslot;
        }
        const startTimeOfEndingSplitTimeslot = dateFns.addMinutes(new Date(startTimeEvent.availableTimeslot.startTime), minutesIntoTimeslotEventWillStart + eventDurationInMinutes);
        if (dateFns.differenceInMinutes(startTimeOfEndingSplitTimeslot, new Date(startTimeEvent.availableTimeslot.endTime)) !== 0) {
            const newSecondTimeslot = {
                oldId: startTimeEvent.availableTimeslot.id,
                startTime: startTimeOfEndingSplitTimeslot,
                endTime: startTimeEvent.availableTimeslot.endTime,
            };
            splitTimeslots[1] = newSecondTimeslot;
        }
        return splitTimeslots;
    };
    const _onStartTimeSelect = (startTimeEvent) => {
        const splitTimeslots = splitTimeslot(startTimeEvent);
        const startTimeEventEmitObject = Object.assign(Object.assign({}, startTimeEvent), { splitTimeslot: splitTimeslots });
        if (onStartTimeSelect) {
            onStartTimeSelect(startTimeEventEmitObject);
        }
    };
    React.useEffect(() => {
        // compile a list of all possible event start times given all timeslots
        const startTimeEvents = [];
        // iterate through all available timeslots
        for (const availableTimeslot of availableTimeslots) {
            const timeslotDuration = dateFns.differenceInMinutes(new Date(availableTimeslot.endTime), new Date(availableTimeslot.startTime));
            // this prevents start times from being created where the event duration runs past the available timeslot
            let startTimesPossible = Math.floor(timeslotDuration / (eventDurationInMinutes + eventStartTimeSpreadInMinutes)) - 1;
            while (startTimesPossible >= 0) {
                const newStartTimeEvent = {
                    availableTimeslot,
                    startTime: dateFns.addMinutes(new Date(availableTimeslot.startTime), startTimesPossible * (eventDurationInMinutes + eventStartTimeSpreadInMinutes)),
                };
                startTimeEvents.push(newStartTimeEvent);
                startTimesPossible--;
            }
        }
        // set initial display date
        if (initialDisplayDay) {
            setSelectedDay(initialDisplayDay);
        }
        setStartTimeEventsList(startTimeEvents);
    }, [availableTimeslots, eventDurationInMinutes, eventStartTimeSpreadInMinutes, initialDisplayDay]);
    React.useEffect(() => {
        const startTimeEventsToDisplay = [];
        // filter out startTimeEvents so we get the list of ones to display next to the calendar
        for (const startTimeEvent of startTimeEventsList) {
            // make sure its the same day as the selected day
            if (dateFns.isSameDay(startTimeEvent.startTime, selectedDay)) {
                // prevents duplicate times (in case there are multiple overlapping shifts)
                if (startTimeEventsToDisplay.filter((item) => dateFns.isSameMinute(item.startTime, startTimeEvent.startTime)).length === 0) {
                    if (!dateFns.isPast(startTimeEvent.startTime)) {
                        startTimeEventsToDisplay.push(startTimeEvent);
                    }
                }
            }
        }
        // order the events by first in the day
        const orderedEvents = startTimeEventsToDisplay.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        setSelectedDayStartTimeEventsList(orderedEvents);
    }, [selectedDay, startTimeEventsList]);
    const goToPreviousMonth = () => {
        setSelectedDay(dateFns.subMonths(selectedDay, 1));
    };
    const goToNextMonth = () => {
        setSelectedDay(dateFns.addMonths(selectedDay, 1));
    };
    const goToPreviousDay = () => {
        setSelectedDay(dateFns.subDays(selectedDay, 1));
    };
    const goToNextDay = () => {
        setSelectedDay(dateFns.addDays(selectedDay, 1));
    };
    return (React__default['default'].createElement(Container, null,
        React__default['default'].createElement(Inner, { borderRadius: borderRadius, style: scheduleMeetingStyles },
            React__default['default'].createElement(CalendarContainer, null,
                React__default['default'].createElement(Header, null,
                    React__default['default'].createElement(ArrowButton, { borderRadius: borderRadius, onClick: goToPreviousMonth },
                        React__default['default'].createElement(Arrow, { direction: "back" })),
                    React__default['default'].createElement(SelectedDayTitle, null, dateFns.format(selectedDay, 'LLLL yyyy')),
                    React__default['default'].createElement(ArrowButton, { borderRadius: borderRadius, onClick: goToNextMonth },
                        React__default['default'].createElement(Arrow, { direction: "forward" }))),
                React__default['default'].createElement(ScheduleCalendar, { borderRadius: borderRadius, primaryColor: primaryColorRGB, selectedDay: selectedDay, availableTimeslots: availableTimeslots, primaryColorFaded: primaryColorFaded, onDaySelected: onDaySelected })),
            React__default['default'].createElement(Divider, null),
            React__default['default'].createElement(StartTimeListContainer, null,
                React__default['default'].createElement(StartTimeListContainerAbsolute, null,
                    React__default['default'].createElement(Header, null,
                        React__default['default'].createElement(ArrowButton, { borderRadius: borderRadius, onClick: goToPreviousDay },
                            React__default['default'].createElement(Arrow, { direction: "back" })),
                        React__default['default'].createElement(SelectedDayTitle, null, dateFns.format(selectedDay, 'cccc, LLLL do')),
                        React__default['default'].createElement(ArrowButton, { borderRadius: borderRadius, onClick: goToNextDay },
                            React__default['default'].createElement(Arrow, { direction: "forward" }))),
                    React__default['default'].createElement(EventList, { primaryColorFaded: primaryColorFaded, primaryColor: primaryColorRGB, borderRadius: borderRadius, emptyListContentEl: emptyListContentEl, onStartTimeSelect: _onStartTimeSelect, startTimeListItems: selectedDayStartTimeEventsList }))))));
};

exports.ScheduleMeeting = ScheduleMeeting;
