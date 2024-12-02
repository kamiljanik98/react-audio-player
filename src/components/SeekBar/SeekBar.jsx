import React from "react";
import PropTypes from "prop-types";
import styles from "./SeekBar.module.scss";

const SeekBar = ({
  seek,
  duration,
  onSeekingChange,
  onSeekStart,
  onSeekEnd,
}) => (
  <div className={styles.seek}>
    <input
      aria-label="Seekbar"
      type="range"
      min="0"
      max={duration ? duration.toFixed(2) : 0}
      step=".01"
      value={seek}
      onChange={onSeekingChange}
      onMouseDown={onSeekStart}
      onMouseUp={onSeekEnd}
    />
  </div>
);

SeekBar.propTypes = {
  seek: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired, 
  onSeekingChange: PropTypes.func.isRequired, 
  onSeekStart: PropTypes.func.isRequired, 
  onSeekEnd: PropTypes.func.isRequired, 
};

export default SeekBar;
