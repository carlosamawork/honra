'use client';
import { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import s from "./LazyVideo.module.scss";
import { GeneralContext } from "@/context/generalContext";

interface LazyVideoProps {
    alt?: string;
    src: string;
    defaultInView?: boolean;
    autoplay: boolean;
    controls?: boolean;
    muted?: boolean;
    preload?: boolean;
    isHero?: boolean;
    onLoadedData?: () => void;
}

export default function LazyVideo({
    alt = "",
    src = "",
    defaultInView = false,
    autoplay = false,
    controls,
    muted = true,
    preload = false,
    onLoadedData,
    isHero
}: LazyVideoProps) {
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const { isInitialized } = useContext(GeneralContext);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false,
        initialInView: defaultInView,
    });

    useEffect(() => {
        if (videoRef.current && !muted) {
            videoRef.current.volume = 0.5;
        }
    }, [muted]);

    useEffect(() => {
        if (isHero && isInitialized) {
            videoRef.current?.play().catch(() => {});
            setIsPlaying(true);
        }
    }, [isInitialized]);

    const handleLoadedData = () => {
        setIsLoaded(true);
        setTimeout(() => {
            setIsVisible(true);

            const rect = videoRef.current?.getBoundingClientRect();
            if (rect) {
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                const el = document.elementFromPoint(x, y);
                const isActuallyVisible = videoRef.current?.contains(el);

                if (isActuallyVisible && autoplay) {
                    videoRef.current?.play().catch(() => {});
                    setIsPlaying(true);
                }
            }
        }, 50);

        if (onLoadedData) onLoadedData();
    };

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    useEffect(() => {
        const tryAutoplay = async () => {
            if (
                autoplay &&
                muted &&
                inView &&
                videoRef.current &&
                isLoaded &&
                isVisible
            ) {
                try {
                    await videoRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.warn("Autoplay blocked:", err);
                }
            }
        };

        tryAutoplay();
    }, [autoplay, muted, inView, isLoaded, isVisible]);

    return (
        <div className={s.lazyVideo}>
            <div
                ref={ref}
                style={{ height: "100%" }}
                className={`${s.contentVideo} ${isLoaded && isVisible ? s.fadeIn : s.hidden}`}
                onClick={handleVideoClick}
            >
                <video
                    ref={videoRef}
                    src={src}
                    autoPlay={autoplay}
                    muted={muted}
                    loop
                    playsInline
                    preload={preload ? "metadata" : "auto"}
                    controls={controls}
                    controlsList="nodownload noplaybackrate nofullscreen"
                    onLoadedData={handleLoadedData}
                />
            </div>
        </div>
    );
}