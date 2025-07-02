import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 transition-opacity duration-500">
      <img
        src="https://page1.genspark.site/v1/base64_upload/86a43e68b79a9abfc04159ee52699655"
        alt="Tau Nu Chapter Logo"
        className="w-36 h-36 rounded-full loading-pulse"
        style={{ boxShadow: 'var(--shadow-gold)' }}
      />
    </div>
  );
};

export default LoadingScreen;