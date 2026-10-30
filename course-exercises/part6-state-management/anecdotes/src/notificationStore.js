import { create } from "zustand";

let timeoutId = null;

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    addNotification: (message) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      set({ notification: message });
      timeoutId = setTimeout(() => {
        set({ notification: null });
        timeoutId = null;
      }, 5000);
    },
  },
}));

export const useNotification = () =>
  useNotificationStore((state) => state.notification);
export const useNotificationAction = () =>
  useNotificationStore((state) => state.actions);
