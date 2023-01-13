const keys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export default function Keyboard(props: any) {
  return (
    <>
      {keys.map((key) => {
        return (
          <button
            className="btn btn-primary m-1 px-4 py-1"
            disabled={
              props.correctLetters.includes(key) ||
              props.wrongLetters.includes(key) ||
              props.wrongLetters.length > 5 ||
              props.won
                ? true
                : false
            }
            onClick={props.handleGuess}
            key={key}
            value={key}
          >
            {key}
          </button>
        );
      })}
    </>
  );
}
