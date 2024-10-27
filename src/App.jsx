import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import VideoBackground from "./components/VideoBackground/VideoBackground";

const App = () => {
  return (
    <VideoBackground src="https://videos.pexels.com/video-files/9239758/9239758-uhd_2560_1440_25fps.mp4">
      <AudioPlayer />
    </VideoBackground>
  );
};

export default App;
