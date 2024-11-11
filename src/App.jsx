import React from 'react';
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import VideoBackground from "./components/VideoBackground/VideoBackground";

const App = () => {
  return (
    <VideoBackground src="https://videos.pexels.com/video-files/2836314/2836314-uhd_2560_1440_24fps.mp4">
      <AudioPlayer />
    </VideoBackground>
  );
};

export default App;
