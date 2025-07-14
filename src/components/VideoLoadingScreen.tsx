import { useState, useEffect } from "react";

const VideoLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Only hide when both page and video are ready
    if (!isLoading && videoReady) {
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [isLoading, videoReady]);

  useEffect(() => {
    // Wait for the page to fully load
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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
        (!isLoading && videoReady) ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: (!isLoading && videoReady) ? 'none' : 'auto' }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        onCanPlayThrough={() => {
          console.log("Video ready to play");
          setVideoReady(true);
        }}
        onLoadedData={() => {
          console.log("Video data loaded");
        }}
        onError={(e) => {
          console.error("Video failed to load:", e);
          // Fallback: hide loading screen if video fails
          setVideoReady(true); // Set as "ready" to hide the screen
        }}
      >
        <source src="/Tau-Nu-Alphas/Gorilla_Smashes_Through_Image_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoLoadingScreen;