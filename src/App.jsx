import FullControl from "./components/AudioPlayer/FullControl";
import VideoBackground from "./components/VideoBackground/VideoBackground";

const App = () => {
  return (
    <VideoBackground src="./public/bg-video1.mp4">
      <FullControl />
    </VideoBackground>
  );
};

export default App;
