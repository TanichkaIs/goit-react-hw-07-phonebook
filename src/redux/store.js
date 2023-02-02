import { configureStore } from '@reduxjs/toolkit';
import { contactsApi, contactsFilterSlice } from './contactSlice';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: contactsFilterSlice.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],    
});