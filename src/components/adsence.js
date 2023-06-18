import { useEffect } from 'react';

const AdSense = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        if (window && window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      }, 1000); // Delay of 1 second
    
      return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="auto"
      data-ad-client="ca-pub-1432393119062321"
      data-ad-slot="YOUR_AD_SLOT"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;