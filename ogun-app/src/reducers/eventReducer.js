import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
    {
      title: "cumpleaños",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgcolor: "#fafafa",
    },
  ],
  activeEvent: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
      case types.eventAddNew:
      return {
        ...state,
        events: [
          ...state.events,
          action.payload,
        ],
        activeEvent: action.payload,
      };

    default:
     return state;
  }
};
