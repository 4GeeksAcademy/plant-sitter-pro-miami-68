import React from "react";
import "../../styles/ShovelAnimation.css";

const ShovelAnimation = () => {
  return (
    <div className="shovel-animation-container">
      <div className="shovel">
        <div className="shovel-head"></div>
        <div className="shovel-handle"></div>
      </div>
      <div className="dirt-particles">
        <div className="dirt dirt1"></div>
        <div className="dirt dirt2"></div>
        <div className="dirt dirt3"></div>
      </div>
      <div className="floor">
        <div className= "floordirt"></div>
      </div>
    </div>
  );
};

export default ShovelAnimation;
