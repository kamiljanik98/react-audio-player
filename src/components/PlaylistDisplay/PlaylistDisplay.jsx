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
      {/* Current track display as toggle for the playlist */}
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
  playlist: PropTypes.array.isRequired, // An array of track objects to be displayed in the playlist (required)
  onSelectTrack: PropTypes.func.isRequired, // Callback function to handle the selection of a track from the playlist (required)
  currentTrack: PropTypes.object.isRequired, // The currently playing track (required)
};

export default Playlist;
