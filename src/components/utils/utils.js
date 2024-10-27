// utils.js
import raf from "raf"; // requestAnimationFrame polyfill

export const handleOnLoad = (component) => {
  const currentTrack =
    component.state.playlist[component.state.currentTrackIndex];
  component.setState({
    loaded: true,
    duration: component.player.duration(),
    trackName: currentTrack.title,
    artist: currentTrack.artist,
  });
};

export const handleToggle = (component) => {
  component.setState((prevState) => ({
    playing: !prevState.playing,
  }));
};

export const handleNextTrack = (component) => {
  component.setState((prevState) => {
    const nextIndex =
      (prevState.currentTrackIndex + 1) % prevState.playlist.length;
    return { currentTrackIndex: nextIndex, loaded: false };
  });
};

export const handlePreviousTrack = (component) => {
  component.setState((prevState) => {
    const prevIndex =
      (prevState.currentTrackIndex - 1 + prevState.playlist.length) %
      prevState.playlist.length;
    return { currentTrackIndex: prevIndex, loaded: false };
  });
};

export const handleStop = (component) => {
  component.player.stop();
  component.setState({
    playing: false, // Need to update our local state so we don't immediately invoke autoplay
  });
  renderSeekPos(component);
};

export const handleVolumeChange = (component, value) => {
  const normalizedValue = Math.min(1, Math.max(0, value / 100));
  component.setState({ volume: normalizedValue });
};

export const handleLoopToggle = (component) => {
  component.setState((prevState) => ({
    loop: !prevState.loop,
  }));
};

export const handleRate = (component, e) => {
  const rate = parseFloat(e.target.value);
  component.player.rate(rate);
  component.setState({ rate });
};

export const clearRAF = (component) => {
  raf.cancel(component._raf);
};

export const handleSeekingChange = (component, e) => {
  component.setState({
    seek: parseFloat(e.target.value),
  });
};

export const handleMouseDownSeek = (component) => {
  component.setState({
    isSeeking: true,
  });
};

export const handleMouseUpSeek = (component, e) => {
  component.setState({
    isSeeking: false,
  });

  component.player.seek(e.target.value);
};


export const handleOnPlay = (component) => {
  component.setState({
    playing: true,
  });
  renderSeekPos(component);
};

export const handleOnEnd = (component) => {
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


export const handleMuteToggle = (component) => {
  component.setState((prevState) => ({
    mute: !prevState.mute,
  }));
};


export const handleSelectTrack = (component, index) => {
  component.setState({
    currentTrackIndex: index,
    loaded: false,
    playing: true,
  });
};


export const renderSeekPos = (component) => {
  if (!component.state.isSeeking) {
    component.setState({
      seek: component.player.seek(),
    });
  }
  if (component.state.playing) {
    component._raf = raf(() => renderSeekPos(component));
  }
};

