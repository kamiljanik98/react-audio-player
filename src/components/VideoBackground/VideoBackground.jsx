import PropTypes from "prop-types";
import styles from "./video-background.module.scss"; // Import your CSS module

const VideoBackground = ({ src, children }) => {
  return (
    <div className={styles.videoBackgroundContainer}>
      <video className={styles.videoBackground} src={src} autoPlay loop muted />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

VideoBackground.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node, // Accepts children to overlay on the video
};

export default VideoBackground;
