import React from "react";
import { useState } from "react";
import { truncateText } from "../utils/truncateText";
import PropTypes from "prop-types";
import styles from "./PlaylistDisplay.module.scss";

const Playlist = ({ playlist, onSelectTrack, currentTrack }) => {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const currentTrackName = currentTrack.title + " " + "by" + " " + currentTrack.artist;
  
  const togglePlaylist = () => {
    setShowPlaylist((prevShow) => !prevShow);
  };


  return (
    <>
      <div className={styles.currentTrack} onClick={togglePlaylist}>
        <p>{truncateText(currentTrackName)} </p>
      </div>

      {showPlaylist && (
        <div className={styles.playlist}>
          {playlist.map((track, index) => (
            <div
              key={track.id}
              className={styles.playlistItem}
              onClick={() => onSelectTrack(index)}
            >
              <div className={styles.trackID}>
                <p>
                  <strong>{truncateText(track.title)}</strong>
                </p>
                <p>{truncateText(track.artist)}</p>
              </div>

              <p className={styles.trackTempo}>{track.tempo}</p>
              <p className={styles.trackTonic}>
                {track.key}
                {track.scale}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired, 
  onSelectTrack: PropTypes.func.isRequired, 
  currentTrack: PropTypes.object.isRequired,
};

export default Playlist;
