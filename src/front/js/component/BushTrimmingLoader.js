import React from 'react';
import '../../styles/BushTrimmingLoader.css';

const BushTrimmingLoader = () => {
  return (
    <div className="bush-trimming-loader-container">
      <div className="loading-container">
        <div className="bush"></div>
        <div className="scissors">
          <div className="blade blade-left"></div>
          <div className="blade blade-right"></div>
        </div>
        <div className="hand"></div>
      </div>
    </div>
  );
};

export default BushTrimmingLoader;
