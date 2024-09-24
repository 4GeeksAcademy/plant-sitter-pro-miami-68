import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import repottingImage from "../../img/HomePageImages/Gemini.Repotting.Home.jpg"; // Path to the repotting image
import "../../styles/repottingservice.css";

const RepottingService = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [showText, setShowText] = useState(true); // State to control the visibility of the text
  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);

  const loadYouTubeAPI = () => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };

  useEffect(() => {
    loadYouTubeAPI(); // Load the YouTube API when the component mounts
  }, []);

  const handleImageClick = () => {
    setShowVideo(true);
    setShowText(false); // Hide the text when the image is clicked
  };

  useEffect(() => {
    if (showVideo && window.YT) {
      playerRef.current = new window.YT.Player(videoContainerRef.current, {
        videoId: "B2DHz1SLZ-k", // Replace with your YouTube video ID
        playerVars: {
          controls: 1, // Show full controls
          modestbranding: 1, // Minimal YouTube branding
          rel: 0, // Disable related videos at the end
          showinfo: 0, // Disable showing the video info
          fs: 1, // Allow fullscreen
          cc_load_policy: 0, // Disable closed captions by default
        },
        events: {
          onReady: (event) => {
            event.target.playVideo(); // Automatically play video on ready
          },
        },
      });
    }
  }, [showVideo]);

  return (
    <>
      {showText && (
        <div className="click-text-container">
          <p className="click-text">Click image below</p>
        </div>
      )}
      <div className="service-page-container">
        <div className="service-image-container" onClick={handleImageClick}>
          <img
            src={repottingImage}
            alt="Repotting Service"
            className={`service-image ${showVideo ? "fade-out" : ""}`}
          />
          {showVideo && (
            <div ref={videoContainerRef} className="service-video"></div>
          )}
        </div>
        <div className="service-description-container">
          <h2>Repotting Service</h2>
          <p>
            Repotting is essential for maintaining the health and growth of your
            plants. Our experts carefully transfer your plants to new pots,
            ensuring the roots have ample space to grow and thrive.
          </p>
          <button
            className="btn btn-success mt-3"
            onClick={() => navigate("/client-signup1")}
          >
            Sign Up to Schedule
          </button>
        </div>
      </div>
    </>
  );
};

export default RepottingService;