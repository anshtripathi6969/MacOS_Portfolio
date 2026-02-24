import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useWallpaperStore from "../store/wallpaperStore";

const DesktopBackground = () => {
    const { currentWallpaper } = useWallpaperStore();
    const bgRef = useRef(null);
    const [prevWallpaper, setPrevWallpaper] = useState(currentWallpaper);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (currentWallpaper === prevWallpaper) return;

        setIsTransitioning(true);
        const tl = gsap.timeline({
            onComplete: () => {
                setPrevWallpaper(currentWallpaper);
                setIsTransitioning(false);
            }
        });

        // Smooth cross-fade effect
        tl.to(bgRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut"
        })
            .set(bgRef.current, {
                backgroundImage: `url(${currentWallpaper})`
            })
            .to(bgRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            });

    }, [currentWallpaper, prevWallpaper]);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-black">
            {/* Previous Wallpaper (Static) */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                style={{ backgroundImage: `url(${prevWallpaper})` }}
            />

            {/* Transitioning Overlay */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{
                    backgroundImage: `url(${currentWallpaper})`,
                    opacity: isTransitioning ? 0 : 1
                }}
            />

            {/* Subtle Grain/Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
            <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none opacity-30" />
        </div>
    );
};

export default DesktopBackground;
