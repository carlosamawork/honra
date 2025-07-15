'use client';
import { useEffect, useRef, useState } from 'react';

// Import lottie and assert its type as any
const lottie: any = require('lottie-web');

interface LottieProps {
    data: string;
    onReady?: () => void;
}

// Define a basic type for the AnimationItem
type AnimationItem = {
    destroy: () => void;
    // You can add more methods and properties as needed
};

export default function LottieComponent({ data, onReady}: LottieProps) {
    const animationContainer = useRef<HTMLDivElement>(null);
    const [animationPlayed, setAnimationPlayed] = useState(false);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        let animation: AnimationItem | null = null;

        if (animationContainer.current) {

            observer = new IntersectionObserver((entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !animationPlayed) {
                    
                    let animation = lottie.loadAnimation({
                        container: animationContainer.current,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: data
                    });
                    animation.addEventListener('DOMLoaded', () => {
                        if (onReady) onReady();
                    });
                    setAnimationPlayed(true);
                }
            }, { threshold: 0.1 });

            observer.observe(animationContainer.current);
        }

        return () => {
            
            if (observer) observer.disconnect();
        };
    }, [animationPlayed, data]);

    return <div ref={animationContainer}></div>;
}
