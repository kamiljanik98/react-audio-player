import FullControl from "./components/AudioPlayer/FullControl";
import VideoBackground from "./components/VideoBackground/VideoBackground";

const App = () => {
  return (
    <VideoBackground src="https://videos.pexels.com/video-files/2344546/2344546-uhd_2560_1440_25fps.mp4">
      <FullControl />
    </VideoBackground>
  );
};

export default App;
