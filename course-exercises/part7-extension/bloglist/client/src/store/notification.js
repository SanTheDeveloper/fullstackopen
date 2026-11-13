import { create } from "zustand";

const useNotificationStore = create((set, get) => {
  let timeoutId;

  return {
    message: "",
    type: null,

    showNotification: (message, type = "success") => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      set({ message, type });
      timeoutId = setTimeout(() => {
        get().clearNotification();
      }, 5000);
    },

    clearNotification: () => {
      set({ message: "", type: null });
      clearTimeout(timeoutId);
      timeoutId = undefined;
    },
  };
});

export default useNotificationStore;
