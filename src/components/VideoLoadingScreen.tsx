import { useState, useEffect } from "react";

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
      }, 100); // Reduced delay since we're waiting for video to end
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
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={() => {
          console.log("Video playback ended");
          setVideoEnded(true);
        }}
        onCanPlayThrough={() => {
          console.log("Video ready to play");
        }}
        onLoadedData={() => {
          console.log("Video data loaded");
        }}
        onError={(e) => {
          console.error("Video failed to load:", e);
          // If video fails, transition after a delay
          setTimeout(() => {
            setVideoEnded(true);
          }, 2000);
        }}
      >
        <source src="/Gorilla_Smashes_Through_Image_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoLoadingScreen;