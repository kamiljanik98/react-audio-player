import React from "react";
import PropTypes from "prop-types";
import {
  CgPlayPause,
  CgPlayButton,
  CgPlayBackwards,
  CgPlayForwards,
  CgPlayStop,
} from "react-icons/cg";
import styles from "./Controls.module.scss";

const Controls = ({ playing, onToggle, onStop, onPrevious, onNext }) => (
  <div className={styles.controls}>
    <button aria-label="PlayPause" onClick={onToggle}>
      {playing ? <CgPlayPause size={28} /> : <CgPlayButton size={28} />}
    </button>
    <button aria-label="Stop" onClick={onStop}>
      <CgPlayStop size={28} />
    </button>
    <button aria-label="Previous" onClick={onPrevious}>
      <CgPlayBackwards size={28} />
    </button>
    <button aria-label="Next" onClick={onNext}>
      <CgPlayForwards size={28} />
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
