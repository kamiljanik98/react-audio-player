import raf from "raf"; // requestAnimationFrame polyfill

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

const handleOnLoad = (component) => {
  const currentTrack =
    component.state.playlist[component.state.currentTrackIndex];
  component.setState({
    loaded: true,
    duration: component.player.duration(),
    trackName: currentTrack.title,
    artist: currentTrack.artist,
  });
};

const handleToggle = (component) => {
  component.setState((prevState) => ({
    playing: !prevState.playing,
  }));
};

const handleNextTrack = (component) => {
  component.setState((prevState) => {
    const nextIndex =
      (prevState.currentTrackIndex + 1) % prevState.playlist.length;
    return { currentTrackIndex: nextIndex, loaded: false };
  });
};

const handlePreviousTrack = (component) => {
  component.setState((prevState) => {
    const prevIndex =
      (prevState.currentTrackIndex - 1 + prevState.playlist.length) %
      prevState.playlist.length;
    return { currentTrackIndex: prevIndex, loaded: false };
  });
};

const handleStop = (component) => {
  component.player.stop();
  component.setState({
    playing: false, // Need to update our local state so we don't immediately invoke autoplay
  });
  renderSeekPos(component);
};

const handleVolumeChange = (component, value) => {
  const normalizedValue = Math.min(1, Math.max(0, value / 100));
  component.setState({ volume: normalizedValue });
};

const handleLoopToggle = (component) => {
  component.setState((prevState) => ({
    loop: !prevState.loop,
  }));
};

const handleRate = (component, e) => {
  const rate = parseFloat(e.target.value);
  component.player.rate(rate);
  component.setState({ rate });
};

const clearRAF = (component) => {
  raf.cancel(component._raf);
};

const handleSeekingChange = (component, e) => {
  component.setState({
    seek: parseFloat(e.target.value),
  });
};

const handleMouseDownSeek = (component) => {
  component.setState({
    isSeeking: true,
  });
};

const handleMouseUpSeek = (component, e) => {
  component.setState({
    isSeeking: false,
  });

  component.player.seek(e.target.value);
};

const handleOnPlay = (component) => {
  // Update playing state
  component.setState({ playing: true }, () => {
    // Now we can safely check the updated state
    if (!component.state.isSeeking) {
      // Update the seek position immediately when the track starts playing
      component.setState({
        seek: component.player.seek(), // Get the current seek position
      });
    }

    // Start the render loop if the track is playing
    component._raf = raf(() => renderSeekPos(component));
  });
};

const renderSeekPos = (component) => {
  if (!component.state.isSeeking) {
    component.setState({
      seek: component.player.seek(),
    });
  }
  if (component.state.playing) {
    component._raf = raf(() => renderSeekPos(component));
  }
};

const handleOnEnd = (component) => {
  const { loop, currentTrackIndex, playlist } = component.state;

  if (loop) {
    // Restart the current track
    component.setState(
      {
        playing: true,
      },
      () => {
        if (component.player) {
          component.player.howler.stop(); // Stop the current track
          component.player.howler.play(); // Play the current track again
        }
      },
    );
  } else {
    // Move to the next track
    const nextTrackIndex = (currentTrackIndex + 1) % playlist.length;

    component.setState(
      {
        currentTrackIndex: nextTrackIndex,
        playing: true,
      },
      () => {
        if (component.player) {
          component.player.howler.stop(); // Stop the current track
          component.player.howler.play(); // Play the next track
        }
      },
    );
  }

  clearRAF(component);
};

const handleMuteToggle = (component) => {
  component.setState((prevState) => ({
    mute: !prevState.mute,
  }));
};

const handleSelectTrack = (component, index) => {
  component.setState({
    currentTrackIndex: index,
    loaded: false,
    playing: true,
  });
};

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
