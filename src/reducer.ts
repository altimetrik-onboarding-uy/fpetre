import { CalendarState, Action } from "./interfaces";

export const calendarReducer = (
  state: CalendarState,
  action: Action
): CalendarState => {
  const mini = action.payload ? action.payload.mini : false;
  switch (action.type) {
    case "CHANGE_CALENDAR_MODE": {
      const newState: CalendarState = {
        ...state,
        calendarMode: action.payload.calendarMode
      };
      localStorage.setItem(
        "calendarState",
        JSON.stringify({
          ...newState,
          currentDate: newState.currentDate
        })
      );
      return newState;
    }

    case "ADD_TASK": {
      const { title, time, day } = action.payload.task;
      const newState: CalendarState = {
        ...state,
        tasks: [...state.tasks, { title, time, day }],
        currentDayId: 0
      };
      localStorage.setItem("calendarState", JSON.stringify(newState));
      return newState;
    }
    case "SET_SELECTED_DAY": {
      const newState: CalendarState = {
        ...state,
        selectedDayMini: action.payload.dayId
      };
      localStorage.setItem("calendarState", JSON.stringify(newState));
      return newState;
    }
    case "TOGGLE_MODAL": {
      const newState: CalendarState = {
        ...state,
        currentDayId: action.payload.dayId
      };
      localStorage.setItem("calendarState", JSON.stringify(newState));

      return newState;
    }
    case "NEXT_MONTH": {
      let newState: CalendarState;
      const currentDate = mini ? "currentDateMin" : "currentDate";
      if (new Date(state[currentDate]).getMonth() === 11) {
        const year = new Date(state[currentDate]).getFullYear() + 1;
        newState = {
          ...state,
          [currentDate]: new Date(year, 0).getTime()
        };
      } else {
        newState = {
          ...state,
          [currentDate]: new Date(
            new Date(state[currentDate]).getFullYear(),
            new Date(state[currentDate]).getMonth() + 1
          ).getTime()
        };
      }
      localStorage.setItem("calendarState", JSON.stringify(newState));
      return newState;
    }

    case "PREV_MONTH": {
      let newState: CalendarState;
      const currentDate = mini ? "currentDateMin" : "currentDate";
      if (new Date(state[currentDate]).getMonth() === 0) {
        newState = {
          ...state,
          [currentDate]: new Date(
            new Date(state[currentDate]).getFullYear() - 1,
            11
          ).getTime()
        };
      } else {
        newState = {
          ...state,
          [currentDate]: new Date(
            new Date(state[currentDate]).getFullYear(),
            new Date(state[currentDate]).getMonth() - 1
          ).getTime()
        };
      }
      localStorage.setItem("calendarState", JSON.stringify(newState));
      return newState;
    }

    case "PREV_YEAR": {
      const newState: CalendarState = {
        ...state,
        currentDate: new Date(
          new Date(state.currentDate).getFullYear() - 1,
          new Date(state.currentDate).getMonth()
        ).getTime()
      };
      localStorage.setItem("calendarState", JSON.stringify(newState));
      return newState;
    }
    case "NEXT_YEAR": {
      const newState: CalendarState = {
        ...state,
        currentDate: new Date(
          new Date(state.currentDate).getFullYear() + 1,
          new Date(state.currentDate).getMonth()
        ).getTime()
      };
      localStorage.setItem("calendarState", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
