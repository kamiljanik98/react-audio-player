import { useState } from "react";
import PropTypes from "prop-types";

const Playlist = ({ playlist, onSelectTrack, currentTrack }) => {
  const [showPlaylist, setShowPlaylist] = useState(false);

  const togglePlaylist = () => {
    setShowPlaylist((prevShow) => !prevShow);
  };

  const truncateText = (text) => {
    return text.length > 15 ? `${text.substring(0, 15)}...` : text;
  };

  const currentTrackName =
    currentTrack.title + " " + "by" + " " + currentTrack.artist;

  return (
    <>
      {/* Current track display as toggle for the playlist */}
      <div className="current-track" onClick={togglePlaylist}>
        <p>{truncateText(currentTrackName)} </p>
      </div>

      {showPlaylist && (
        <div className="playlist">
          {playlist.map((track, index) => (
            <div
              key={track.id}
              className="playlist-item"
              onClick={() => onSelectTrack(index)}
            >
              <div className="track-id">
                <p>
                  <strong>{truncateText(track.title)}</strong>
                </p>
                <p>{truncateText(track.artist)}</p>
              </div>

              <p className="track-tempo">{track.tempo}</p>
              <p className="track-tonic">
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
