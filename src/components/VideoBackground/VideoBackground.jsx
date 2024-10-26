import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const VideoBackground = ({ src, children }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleEnded = () => {
      videoElement.currentTime = 0; // Restart the video
      videoElement.play(); // Play it again
    };

    if (videoElement) {
      videoElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div className="video-background">
      <video ref={videoRef} className="video" src={src} autoPlay loop muted />
      <div className="overlay">{children}</div>
    </div>
  );
};

VideoBackground.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node, // Accepts children to overlay on the video
};

export default VideoBackground;
