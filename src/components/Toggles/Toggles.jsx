// Components/Toggle.jsx
import PropTypes from "prop-types"; // Import PropTypes
import { IoVolumeMute, IoVolumeMedium, IoRepeat } from "react-icons/io5";
import styles from "./Toggles.module.scss";

const Toggle = ({ loop, mute, onLoopToggle, onMuteToggle }) => (
  <div className={styles.toggles}>
    <button aria-label="Loop" onClick={onLoopToggle}>
      {loop ? <IoRepeat color="#22C55E" size={28} /> : <IoRepeat size={28} />}
    </button>
    <button aria-label="Mute" onClick={onMuteToggle}>
      {mute ? <IoVolumeMute size={28} /> : <IoVolumeMedium size={28} />}
    </button>
  </div>
);

// Define prop types
Toggle.propTypes = {
  loop: PropTypes.bool.isRequired, // Correct type for loop
  mute: PropTypes.bool.isRequired, // Correct type for mute
  onLoopToggle: PropTypes.func.isRequired, // Function to toggle loop
  onMuteToggle: PropTypes.func.isRequired, // Function to toggle mute
};

export default Toggle;
