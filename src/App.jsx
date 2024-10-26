import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import VideoBackground from "./components/VideoBackground/VideoBackground";

const App = () => {
  return (
    <VideoBackground src="https://videos.pexels.com/video-files/28985119/12537126_1920_1080_24fps.mp4">
      <AudioPlayer />
    </VideoBackground>
  );
};

export default App;
