import { configureStore } from '@reduxjs/toolkit';
import NextScreenReducer from './reducer/NextScreenReducer';

const store = configureStore({
  reducer: {
    login: NextScreenReducer,
  },
});

// Definisikan tipe RootState berdasarkan konfigurasi store
export type RootState = ReturnType<typeof store.getState>;

export default store;
