import React from "react";
import PropTypes from "prop-types"; 
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

Toggle.propTypes = {
  loop: PropTypes.bool.isRequired, 
  mute: PropTypes.bool.isRequired, 
  onLoopToggle: PropTypes.func.isRequired, 
  onMuteToggle: PropTypes.func.isRequired, 
};

export default Toggle;
