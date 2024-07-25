import "./LoadingModal.css";
import loadingGif from "../assets/loading.gif";

const LoadingModal = () => {
  return (
    <div className="loading">
      <div></div>
      <img src={loadingGif}></img>
    </div>
  );
};

export default LoadingModal;
