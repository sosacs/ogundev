import React from "react";
import { Provider } from "react-redux";

import { store } from "./store/store";
import { AppRouter } from "./router/AppRouter";

export const OgunApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      <h1>OgunApp</h1>
    </Provider>
  );
};
