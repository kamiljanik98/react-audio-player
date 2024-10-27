// src/components/RateBar.jsx
import PropTypes from "prop-types";

const RateBar = ({ rate, onRateChange }) => (
  <div className="rate-bar">
    <input
      className="rate-slider"
      type="range"
      min="0.6"
      max="1.4"
      step="0.2"
      value={rate}
      onChange={onRateChange} // Pass the event directly
    />
    <div className="rate-range">
      <p>&nbsp;</p>
      <p> | </p>
      <p> | </p>
      <p> | </p>
      <p>&nbsp;</p>
    </div>
  </div>
);

RateBar.propTypes = {
  rate: PropTypes.number.isRequired,
  onRateChange: PropTypes.func.isRequired,
};


export default RateBar;
