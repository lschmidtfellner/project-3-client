import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from '../data/Main.json';
import { useInView } from 'react-intersection-observer';


const LottieAnimation = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger the animation only once
      });

      useEffect(() => {
        if (inView) {
          const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
            mode: 'scroll',
          });
    
          return () => anim.destroy(); // Clean up animation on unmount
        }
      }, [inView]);

      useEffect(() => {
        const containerHeight = containerRef.current.offsetHeight;
    }, [containerRef]);
    

    return (
        <div ref={ref} className="lottie-container relative h-80">
        <div className="flex flex-wrap justify-center items-center w-full h-full">
            <div ref={containerRef} className="lottie-animation absolute xs:-top-10 lg:-top-50 md:-top-50 lg:-mt-16 md:-mt-16"></div>
            <h1 className="text-center text-5xl py-8 absolute inset-x-0 lg:mt-24 md:mt-24ß translate-y-full pink" ref={textRef}>REV RADAR</h1>
        </div>
      </div>
    );
};

export default LottieAnimation;