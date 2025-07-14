import { useState, useEffect } from "react";

// VideoLoadingScreen Component
const VideoLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    // Hide the loading screen when video has ended
    if (videoEnded) {
      // Start fade out immediately when video ends
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [videoEnded]);

  useEffect(() => {
    // Wait for the page to fully load
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-1000 ${
        videoEnded ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: videoEnded ? 'none' : 'auto' }}
    >

      
      <video
        key={Date.now()} // Force reload on every refresh
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        onLoadStart={() => {
          console.log("Video loading started");
        }}
        onCanPlay={() => {
          console.log("Video can start playing");
          setIsLoading(false);
        }}
        onEnded={() => {
          console.log("Video playback ended");
          setVideoEnded(true);
        }}
        onError={(e) => {
          console.error("Video failed to load:", e);
          // If video fails, transition after a delay
          setTimeout(() => {
            setVideoEnded(true);
          }, 2000);
        }}
      >
        <source 
          src={`/Gorilla_Smashes_Through_Image_Video.mp4?v=${Date.now()}`} 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};