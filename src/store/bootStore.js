import { create } from "zustand";

const useBootStore = create((set) => ({
  stage: "boot", // boot | terminal | desktop
  next: () =>
    set((state) => {
      if (state.stage === "boot") return { stage: "terminal" };
      if (state.stage === "terminal") return { stage: "desktop" };
      return state;
    }),
}));

export default useBootStore;
