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
      {/* Fallback content while video loads or if it fails */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-primary mb-2">Loading...</h2>
          <p className="text-muted-foreground">Preparing your experience</p>
        </div>
      </div>
      
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onCanPlayThrough={() => {
          console.log("Video ready to play");
          setVideoReady(true);
        }}
        onLoadedData={() => {
          console.log("Video data loaded");
        }}
        onError={(e) => {
          console.error("Video failed to load, using fallback");
          console.log("Video path attempted:", "/Tau-Nu-Alphas/Gorilla_Smashes_Through_Image_Video.mp4");
          // Keep the loading screen visible with fallback content
          setVideoReady(true);
        }}
      >
        <source src="/Gorilla_Smashes_Through_Image_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoLoadingScreen;