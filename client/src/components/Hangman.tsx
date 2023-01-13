import { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Word from "./Word";
import Figure from "./Figure";
import { movies } from "../api/api";
import ResetButton from "./ResetButton";

export let selectedWord: string =
  movies[Math.floor(Math.random() * movies.length)];

export default function Hangman(props: any) {
  const [correctLetters, setCorrectLetters] = useState<any>([]);
  const [wrongLetters, setWrongLetters] = useState<any>([]);

  function handleGuess(event: any) {
    event.preventDefault();

    const letter = event.currentTarget.value;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters((currentLetters: Array<string>) => {
          return [...currentLetters, letter];
        });
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters((currentLetters: Array<string>) => {
          return [...currentLetters, letter];
        });
      }
    }
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { key, keyCode } = event;

      if (keyCode >= 65 && keyCode <= 90) {
        const letter = key;

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters: Array<string>) => {
              return [...currentLetters, letter];
            });
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters: Array<string>) => {
              return [...currentLetters, letter];
            });
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [correctLetters, wrongLetters]);

  let won = false;

  const isWrong = wrongLetters.length > 5;

  if (selectedWord === undefined) {
    selectedWord = movies[Math.floor(Math.random() * movies.length)];
  }

  let trimWord = [...new Set(selectedWord.split(""))];

  if (correctLetters.length === trimWord.length) {
    won = true;
  }

  const resetButtonHandler = () => {
    setCorrectLetters([]);
    setWrongLetters([]);
    selectedWord = movies[Math.floor(Math.random() * movies.length)];
  };

  const resetButton = <ResetButton resetButtonHandler={resetButtonHandler} />;

  return (
    <div>
      <div>
        <div>
          {!isWrong && (
            <Word correctLetters={correctLetters} selectedWord={selectedWord} />
          )}
          {isWrong && (
            <div>
              <h2>{selectedWord.toUpperCase()}</h2>
              <h3>YOU LOST!!!</h3>
              {resetButton}
            </div>
          )}
        </div>
        <div>
          <div></div>

          <Keyboard
            wrongLetters={wrongLetters}
            correctLetters={correctLetters}
            handleGuess={handleGuess}
            won={won}
          />
        </div>

        <div>wrong letters: {wrongLetters.toString()}</div>

        <div>
          {won && (
            <div>
              <h3>YOU WON!!!</h3>
              {resetButton}
            </div>
          )}
          {!won && <Figure wrongLetters={wrongLetters} />}
        </div>
        <div>{!won && !isWrong && resetButton}</div>
      </div>
    </div>
  );
}
