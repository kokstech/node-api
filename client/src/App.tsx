import { useEffect, useState } from "react";
import Hangman from "./components/Hangman";
import { getMovies } from "./api/api";

const App = () => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <h1>HANGMAN!</h1>

      {!play && (
        <button
          className="btn btn-danger m-1 px-4 py-1"
          onClick={() => {
            setPlay(true);
          }}
        >
          Play
        </button>
      )}
      {play && <Hangman play={play} handlePlay={setPlay} />}
    </div>
  );
};

export default App;
