// AudioPlayer.jsx
import { Component } from "react";
import ReactHowler from "react-howler";
import Knob from "../Knob/Knob";
import Controls from "../Controls/Controls";
import RateBar from "../RateBar/RateBar";
import SeekBar from "../SeekBar/SeekBar";
import Toggle from "../Toggles/Toggles";
import Playlist from "../Playlist/Playlist";
// import FilterMenu from "../FilterMenu/FilterMenu"; // Import the new FilterMenu component

import {
  handleOnLoad,
  handleToggle,
  handleNextTrack,
  handlePreviousTrack,
  handleStop,
  handleVolumeChange,
  handleLoopToggle,
  handleRate,
  clearRAF,
  handleSeekingChange,
  handleMouseDownSeek,
  handleMouseUpSeek,
  handleOnPlay,
  handleOnEnd,
  handleMuteToggle,
  handleSelectTrack,
} from "../utils/utils"; // Import utility functions individually
import { playlist } from "../utils/tracklist";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 285 / 2,
      seek: 0.0,
      rate: 1,
      isSeeking: false,
      currentTrackIndex: 0,
      playlist: playlist,
      activePlaylist: "playlist1",
      showPlaylist: false,
      isFilterVisible: false,
      sortCriteria: "tempo",
      duration: 0, // Initialize duration here
    };
  }

  componentWillUnmount() {
    clearRAF(this);
  }

  // Define event handler methods directly in the class
  handleOnLoad = () => {
    handleOnLoad(this);
  };

  handleToggle = () => {
    handleToggle(this);
  };

  handleNextTrack = () => {
    handleNextTrack(this);
  };

  handlePreviousTrack = () => {
    handlePreviousTrack(this);
  };

  handleStop = () => {
    handleStop(this);
  };

  handleVolumeChange = (value) => {
    handleVolumeChange(this, value);
  };

  handleLoopToggle = () => {
    handleLoopToggle(this);
  };

  handleRate = (e) => {
    handleRate(this, e);
  };

  handleSeekingChange = (e) => {
    handleSeekingChange(this, e);
  };

  handleMouseDownSeek = () => {
    handleMouseDownSeek(this);
  };

  handleMouseUpSeek = (e) => {
    handleMouseUpSeek(this, e);
  };

  handleOnPlay = () => {
    handleOnPlay(this);
  };

  handleOnEnd = () => {
    handleOnEnd(this);
  };

  handleMuteToggle = () => {
    handleMuteToggle(this);
  };

  handleSelectTrack = (index) => {
    handleSelectTrack(this, index);
  };

  render() {
    const currentTrack = this.state.playlist[this.state.currentTrackIndex];

    return (
      <div className="audio-player">
        <ReactHowler
          src={[currentTrack.src]}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          mute={this.state.mute}
          volume={this.state.volume}
          rate={this.state.rate}
          ref={(ref) => (this.player = ref)}
        />

        <Playlist
          playlist={this.state.playlist}
          onSelectTrack={this.handleSelectTrack}
          currentTrack={currentTrack} // Pass the current track
        />

        <Controls
          playing={this.state.playing}
          onToggle={this.handleToggle}
          onStop={this.handleStop}
          onPrevious={this.handlePreviousTrack}
          onNext={this.handleNextTrack}
        />

        <SeekBar
          seek={this.state.seek}
          duration={this.state.duration}
          onSeekingChange={this.handleSeekingChange}
          onSeekStart={this.handleMouseDownSeek}
          onSeekEnd={this.handleMouseUpSeek}
        />

        <RateBar rate={this.state.rate} onRateChange={this.handleRate} />

        <Toggle
          loop={this.state.loop}
          mute={this.state.mute}
          onLoopToggle={this.handleLoopToggle}
          onMuteToggle={this.handleMuteToggle}
        />

        <Knob
          onChange={this.handleVolumeChange}
          startAngle={125}
          maxAngle={285}
        />
      </div>
    );
  }
}

export default AudioPlayer;
