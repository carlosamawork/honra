"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import s from "./LazyImage.module.scss";
import { PortableText } from "@portabletext/react";
import { portableBlockComponents } from "@/utils/portableText";
import { urlFor } from "@/sanity";

interface LazyImageProps {
    alt?: string;
    src: string;
    blurDataURL?: string;
    width: number;
    height: number;
    defaultInView?: boolean;
    disableOpacityAnimation?: boolean;
    backgroundColor?: string | null;
    fullHeight?: boolean;
    fullWidth?: boolean;
    fill?: boolean;
    sizes?: string;
    caption?: any | null;
    aspectRatio?: string | number;
    objectFit?: string;
    reference?: any;
}

// Modifica tu componente LazyImage
export default function LazyImage({
    alt = "",
    src = "",
    blurDataURL="",
    width,
    height,
    defaultInView = true,
    disableOpacityAnimation = false,
    backgroundColor = "white",
    fullHeight = false,
    fullWidth = false,
    fill = false,
    sizes = "",
    caption,
    aspectRatio,
    objectFit = "",
    reference
}: LazyImageProps) {
    const [loaded, setLoaded] = useState(false);
    const [inViewCheck, setInViewCheck] = useState(defaultInView);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        initialInView: defaultInView,
    });

    const [calculatedDimensions, setCalculatedDimensions] = useState<
        { width: number; height: number } | null
    >(null);

    useEffect(() => {
        setInViewCheck(inView);
    }, [inView]);

    const placeholderColor =
        backgroundColor == "darkgreen" ? "lightgreen" : "none";
        
    const updateImageDimensions = () => {
        // Get screen width and height
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
    
        // Calculate the new dimensions for each image
        const originalWidth = width || 1;
        const originalHeight = height || 1;

        // Calculate scale factor based on screen size (20% bigger than screen size)
        const maxWidth = screenWidth * 0.8;
        const maxHeight = screenHeight * 0.8;

        let newWidth = originalWidth;
        let newHeight = originalHeight;

        // Check if the image is larger than the screen width or height
        if (originalWidth > maxWidth || originalHeight > maxHeight) {
        const widthRatio = maxWidth / originalWidth;
        const heightRatio = maxHeight / originalHeight;
        const scaleFactor = Math.min(widthRatio, heightRatio);

        newWidth = originalWidth * scaleFactor;
        newHeight = originalHeight * scaleFactor;
        }

        const newDimensions = 
            {
                width: newWidth,
                height: newHeight,
            }
    
        setCalculatedDimensions(newDimensions);
    
    };

    useEffect(() => {
    // Initial calculation
    updateImageDimensions();

    // Add resize event listener
    window.addEventListener("resize", updateImageDimensions);

    // Cleanup listener on component unmount
    return () => {
        window.removeEventListener("resize", updateImageDimensions);
    };
    }, [src]);
        
    return (
        <div className={s.lazyImage}>
            <div
                ref={ref}
                style={{
                    width: "100%",
                    transition: "all 0.3s ease",
                    // opacity: loaded || disableOpacityAnimation ? 1 : 0,
                }}
                className={`${s.contentImage} ${loaded ? s.unblur : s.blur}`} // Apply unblur class when loaded is true
            >
                {fill  ? (
                    <Image
                        alt={alt}
                        src={src}
                        placeholder={"blur"}
                        blurDataURL={
                            blurDataURL
                                ? urlFor(blurDataURL)
                                .width(width)
                                .height(height)
                                .blur(20)  // Apply a blur effect
                                .url()
                                : '/blur.png' // Use fallbackSrc if blurDataURL is not provided
                        }
                        fill={true}
                        objectFit={objectFit ? objectFit : "cover"}
                        sizes={sizes ? sizes : ""}
                        className={`${s.image} imageFill ${loaded ? s.fadeIn : s.hidden}`}
                        quality={50}
                        onLoad={() => setLoaded(true)} // Set loaded to true when loading completes
                        style={{
                            transition: "all 0.3s ease",
                            opacity: 1,
                            aspectRatio: aspectRatio ? aspectRatio : "",
                        }}
                    />
                ) : (
                    <Image
                        alt={alt}
                        src={src}
                        width={width}
                        height={height}
                        placeholder={"blur"}
                        quality={75}
                        blurDataURL={
                            blurDataURL
                                ? urlFor(blurDataURL)
                                .width(width)
                                .height(height)
                                .blur(20)  // Apply a blur effect
                                .url()
                                : '/blur.png' // Use fallbackSrc if blurDataURL is not provided
                        }
                        className={`${s.image} imageNoFill`}
                        onLoad={() => setLoaded(true)} // Set loaded to true when loading completes
                        style={{
                            transition: "all 0.3s ease",
                            opacity: 1,
                            height: fullHeight ? "100%" : "",
                            width: fullWidth ? "100%" : "",
                            aspectRatio: aspectRatio ? aspectRatio : "",
                        }}
                        
                    />
                )}
            </div>
            {caption && <div className={s.caption}>
                <p><small>{caption}</small></p>
            </div>}
        </div>
    );
}

