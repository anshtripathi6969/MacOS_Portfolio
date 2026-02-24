import { create } from "zustand";

const WALLPAPERS = [
    "/images/wallpaper7.jpg", // Original
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", // Abstract Fluid (Blue/Purple)
    "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2564&auto=format&fit=crop", // Mesh Gradient (Dark)
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop", // Minimalist Geometry
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop", // Soft Flow (Orange/Black)
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop"  // Vibrant Aurora
];

const useWallpaperStore = create((set) => ({
    wallpapers: WALLPAPERS,
    currentIndex: 0,
    currentWallpaper: WALLPAPERS[0],

    nextWallpaper: () => set((state) => {
        const nextIndex = (state.currentIndex + 1) % state.wallpapers.length;
        return {
            currentIndex: nextIndex,
            currentWallpaper: state.wallpapers[nextIndex]
        };
    }),

    setWallpaper: (index) => set((state) => ({
        currentIndex: index,
        currentWallpaper: state.wallpapers[index]
    }))
}));

export default useWallpaperStore;
