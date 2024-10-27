// src/components/AudioPlayer/Playlist.jsx
import PropTypes from "prop-types";

const Playlist = ({ playlist, onSelectTrack }) => {
  return (
    <div className="playlist">
      {playlist.map((track, index) => (
        <div
          key={track.id}
          className="playlist-item"
          onClick={() => onSelectTrack(index)}
        >
          <div className="header">
            <p>
              <strong>{track.title}</strong>
            </p>
            <p>{track.artist}</p>
          </div>

          <p className="tempo">{track.tempo}</p>
          <p>
            {track.key}
            {track.scale}
          </p>
        </div>
      ))}
    </div>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired, // An array of track objects to be displayed in the playlist (required)
  onSelectTrack: PropTypes.func.isRequired, // Callback function to handle the selection of a track from the playlist (required)
};

export default Playlist;
