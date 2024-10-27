import PropTypes from "prop-types";

const SeekBar = ({ seek, duration, onSeekingChange, onSeekStart, onSeekEnd }) => (
  <div className="seek">
    <div className="seek-container">
      <input
        className="slider"
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
