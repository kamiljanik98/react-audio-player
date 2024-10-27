import PropTypes from "prop-types";
import {
  CgPlayPause,
  CgPlayButton,
  CgPlayBackwards,
  CgPlayForwards,
  CgPlayStop,
} from "react-icons/cg";

const Controls = ({ playing, onToggle, onStop, onPrevious, onNext }) => (
  <div className="controls">
    <button onClick={onToggle}>
      {playing ? <CgPlayPause size={24} /> : <CgPlayButton size={24} />}
    </button>
    <button onClick={onStop}>
      <CgPlayStop size={24} />
    </button>
    <button onClick={onPrevious}>
      <CgPlayBackwards size={24} />
    </button>
    <button onClick={onNext}>
      <CgPlayForwards size={24} />
    </button>
  </div>
);

Controls.propTypes = {
  playing: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Controls;
