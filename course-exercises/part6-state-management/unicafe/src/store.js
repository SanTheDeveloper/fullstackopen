import { create } from "zustand";

const useUnicafeStore = create((set) => ({
  values: {
    good: 0,
    bad: 0,
    neutral: 0,
  },

  actions: {
    goodIncrement: () =>
      set((state) => ({
        values: {
          ...state.values,
          good: state.values.good + 1,
        },
      })),
    badIncrement: () =>
      set((state) => ({
        values: {
          ...state.values,
          bad: state.values.bad + 1,
        },
      })),
    neutralIncrement: () =>
      set((state) => ({
        values: {
          ...state.values,
          neutral: state.values.neutral + 1,
        },
      })),
  },
}));

export const useUnicafe = () => useUnicafeStore((state) => state.values);
export const useUnicafeControls = () =>
  useUnicafeStore((state) => state.actions);
