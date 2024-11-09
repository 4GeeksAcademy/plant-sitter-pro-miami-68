import React from "react";
import "../../styles/scissorsAnimation.css"; // Importing CSS for the animation

const ScissorsAnimation = () => {
    return (
        <div className="scissors">
            <div className="scissors-handle">
                <div className="handle-left"></div>
                <div className="handle-right"></div>
            </div>
            <div className="scissors-blade left"></div>
            <div className="scissors-blade right"></div>
        </div>
    );
};

export default ScissorsAnimation;
