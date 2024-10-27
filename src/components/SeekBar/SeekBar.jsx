import PropTypes from "prop-types";

const SeekBar = ({
  seek,
  duration,
  onSeekingChange,
  onSeekStart,
  onSeekEnd,
}) => (
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
  seek: PropTypes.number.isRequired, // The current seek position of the audio in seconds (required)
  duration: PropTypes.number.isRequired, // The total duration of the audio track in seconds (required)
  onSeekingChange: PropTypes.func.isRequired, // Callback function to handle changes in the seeking position (required)
  onSeekStart: PropTypes.func.isRequired, // Callback function triggered when seeking starts (required)
  onSeekEnd: PropTypes.func.isRequired, // Callback function triggered when seeking ends (required)
};

export default SeekBar;
