import { useState, useEffect } from "react";

const VideoLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Wait for the page to fully load
    const handleLoad = () => {
      // Add a small delay to ensure everything is rendered
      setTimeout(() => {
        setIsLoading(false);
        // Start fade out after load is complete
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
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
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        onError={(e) => {
          console.error("Video failed to load:", e);
          // Fallback: hide loading screen if video fails
          setIsLoading(false);
          setTimeout(() => setIsVisible(false), 100);
        }}
      >
        <source src="/Tau-Nu-Alphas/Gorilla_Smashes_Through_Image_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoLoadingScreen;