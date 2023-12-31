import { create } from "zustand";

export const useExerciseStore = create((set) => ({
   currentExercise: {},
   currentRoutine: {},
   setCurrentExercise: (newData) => {
      set({ currentExercise: newData });
   },
   setCurrentRoutine: (newData) => {
      set({ currentRoutine: newData });
   },
}));
