import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './slices/taskSlice';
import messageSlice from './slices/messageSlice';
import userSlice from './slices/userSlice';

const applicationState = 'applicationState';

const localStorageMiddleware = (store) => {
  return (next) => (action) => {
    const result = next(action);
    if (action.type.includes('tasks/')) {
      localStorage.setItem(
        applicationState,
        JSON.stringify({ tasks: store.getState().tasks })
      );
    }
    return result;
  };
};

const loadStateFromLocalStorage = () => {
  if (localStorage.getItem(applicationState) !== null) {
    return JSON.parse(localStorage.getItem(applicationState));
  }
};

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    message: messageSlice.reducer,
    users: userSlice.reducer,
  },
  preloadedState: loadStateFromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
