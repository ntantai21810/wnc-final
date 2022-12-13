import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface INotificationState {
  open: boolean;
  duration: number;
  message: string;
  description: string[];
  type: 'success' | 'info' | 'warning' | 'error';
}

export const initialState: INotificationState = {
  open: false,
  duration: 0,
  message: '',
  description: [],
  type: 'success',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openNotification: (
      state,
      action: PayloadAction<Partial<INotificationState>>
    ) => {
      return {
        open: true,
        duration: action.payload.duration || 3000,
        message: action.payload.message || '',
        description: action.payload.description || [],
        type: action.payload.type || 'info',
      };
    },
    closeNotification: () => {
      return initialState;
    },
  },
});

const notificationReducer = notificationSlice.reducer;

const { openNotification, closeNotification } = notificationSlice.actions;

export { notificationReducer, openNotification, closeNotification };
