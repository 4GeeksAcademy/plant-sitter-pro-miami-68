import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plantCleaningImage from "../../img/HomePageImages/Gemini.PlantCleaning.Service.Home.jpg"; // Path to the plant cleaning image
import "../../styles/plantcleaning.css";

const PlantCleaningService = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [showText, setShowText] = useState(true); // State to control the visibility of the text
  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Function to load the YouTube API script
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
        videoId: "cnGCcmJ7Tt0", // Replace with your YouTube video ID
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
                src={plantCleaningImage}
                alt="Plant Cleaning Service"
                className={`service-image ${showVideo ? "fade-out" : ""}`}
              />
              {showVideo && (
                <div ref={videoContainerRef} className="service-video"></div>
              )}
            </div>
            <div className="service-description-container">
        <h2>Plant Cleaning Service</h2>
        <p>
          Keep your plants looking their best with our plant cleaning service.
          We carefully clean the leaves and stems, removing dust and debris to
          enhance your plant's ability to photosynthesize and grow.
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

export default PlantCleaningService;


//   const navigate = useNavigate();
//   const [showVideo, setShowVideo] = useState(false);
//   const [showText, setShowText] = useState(true); // State to control the visibility of the text
//   const playerRef = useRef(null);
//   const videoContainerRef = useRef(null);

//   // Function to load the YouTube API script
//   const loadYouTubeAPI = () => {
//     const tag = document.createElement('script');
//     tag.src = "https://www.youtube.com/iframe_api";
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//   };

//   useEffect(() => {
//     loadYouTubeAPI(); // Load the YouTube API when the component mounts
//   }, []);

//   const handleImageClick = () => {
//     setShowVideo(true);
//     setShowText(false); // Hide the text when the image is clicked
//   };

//   useEffect(() => {
//     if (showVideo && window.YT) {
//       playerRef.current = new window.YT.Player(videoContainerRef.current, {
//         videoId: "cnGCcmJ7Tt0", // Replace with your YouTube video ID
//         playerVars: {
//           controls: 1, // Show full controls
//           modestbranding: 1, // Minimal YouTube branding
//           rel: 0, // Disable related videos at the end
//           showinfo: 0, // Disable showing the video info
//           fs: 1, // Allow fullscreen
//           cc_load_policy: 0, // Disable closed captions by default
//         },
//         events: {
//           onReady: (event) => {
//             event.target.playVideo(); // Automatically play video on ready
//           }
//         }
//       });
//     }
//   }, [showVideo]);

//   return (
//     <>
//       {showText && (
//         <div className="click-text-container">
//           <p className="click-text">Click image below</p>
//         </div>
//       )}
//       <div className="service-page-container">
//         <div className="service-image-container" onClick={handleImageClick}>
//           <img
//             src={plantCleaningImage}
//             alt="Plant Cleaning Service"
//             className={`service-image ${showVideo ? "fade-out" : ""}`}
//           />
//           {showVideo && (
//             <div ref={videoContainerRef} className="service-video"></div>
//           )}
//         </div>
//         <div className="service-description-container">
//           <h2>Watering Service</h2>
//           <p>
//             Our watering service ensures that your plants receive the optimal
//             amount of water based on their specific needs. Whether you're on
//             vacation or just need a helping hand, our expert plant sitters are
//             here to keep your plants hydrated and thriving.
//           </p>
//           <button
//             className="btn btn-success mt-3"
//             onClick={() => navigate("/client-signup1")}
//           >
//             Sign Up to Schedule
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WateringService;
