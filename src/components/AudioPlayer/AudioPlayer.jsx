import React from "react";
import raf from "raf";
import { Component } from "react";
import ReactHowler from "react-howler";
import Knob from "../Knob/Knob";
import Controls from "../Controls/Controls";
import RateBar from "../RateBar/RateBar";
import SeekBar from "../SeekBar/SeekBar";
import Toggle from "../Toggles/Toggles";
import Playlist from "../PlaylistDisplay/PlaylistDisplay";
import styles from "./AudioPlayer.module.scss";
import { playlist } from "../../const/playlist";

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
      activePlaylist: "playlist",
      showPlaylist: false,
      sortCriteria: "tempo",
      duration: 0,
    };
  }

  renderSeekPos = () => {
    if (!this.state.isSeeking) {
      this.setState({
        seek: this.player.seek(),
      });
    }
    if (this.state.playing) {
      this.rafId = raf(this.renderSeekPos);
    }
  };

  clearRAF = () => {
    if (this.rafId) {
      raf.cancel(this.rafId);
    }
  };

  handleOnLoad = () => {
    const currentTrack = this.state.playlist[this.state.currentTrackIndex];
    this.setState({
      loaded: true,
      duration: this.player.duration(),
      trackName: currentTrack.title,
      artist: currentTrack.artist,
    });
  };

  handleToggle = () => {
    this.setState((prevState) => ({
      playing: !prevState.playing,
    }));
  };

  handleNextTrack = () => {
    this.setState((prevState) => {
      const nextIndex = (prevState.currentTrackIndex + 1) % prevState.playlist.length;
      return { currentTrackIndex: nextIndex, loaded: false };
    });
  };

  handlePreviousTrack = () => {
    this.setState((prevState) => {
      const prevIndex = (prevState.currentTrackIndex - 1 + prevState.playlist.length) % prevState.playlist.length;
      return { currentTrackIndex: prevIndex, loaded: false };
    });
  };

  handleStop = () => {
    this.player.stop();
    this.setState({
      playing: false,
    });
    this.renderSeekPos();
  };

  handleVolumeChange = (value) => {
    const normalizedValue = Math.min(1, Math.max(0, value / 100));
    this.setState({ volume: normalizedValue });
  };

  handleLoopToggle = () => {
    this.setState((prevState) => ({
      loop: !prevState.loop,
    }));
  };

  handleRate = (e) => {
    const rate = parseFloat(e.target.value);
    this.player.rate(rate);
    this.setState({ rate });
  };

  handleSeekingChange = (e) => {
    this.setState({
      seek: parseFloat(e.target.value),
    });
  };

  handleMouseDownSeek = () => {
    this.setState({
      isSeeking: true,
    });
  };

  handleMouseUpSeek = (e) => {
    this.setState({
      isSeeking: false,
    });
    this.player.seek(e.target.value);
  };

  handleOnPlay = () => {
    this.setState({ playing: true }, () => {
      if (!this.state.isSeeking) {
        this.setState({
          seek: this.player.seek(),
        });
      }
      this.rafId = raf(this.renderSeekPos);
    });
  };

  handleOnEnd = () => {
    const { loop, currentTrackIndex, playlist } = this.state;

    if (loop) {
      this.setState({ playing: true }, () => {
        if (this.player) {
          this.player.howler.stop();
          this.player.howler.play();
        }
      });
    } else {
      const nextTrackIndex = (currentTrackIndex + 1) % playlist.length;
      this.setState({ currentTrackIndex: nextTrackIndex, playing: true }, () => {
        if (this.player) {
          this.player.howler.stop();
          this.player.howler.play();
        }
      });
    }

    this.clearRAF();
  };

  handleMuteToggle = () => {
    this.setState((prevState) => ({
      mute: !prevState.mute,
    }));
  };

  handleSelectTrack = (index) => {
    this.setState({
      currentTrackIndex: index,
      loaded: false,
      playing: true,
    });
  };

  render() {
    const currentTrack = this.state.playlist[this.state.currentTrackIndex];

    return (
      <div className={styles.audioPlayer}>
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
          currentTrack={currentTrack}
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
