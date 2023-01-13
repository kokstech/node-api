const Word = (props: {
  selectedWord: string;
  correctLetters: string | string[];
}) => {
  const word = props.selectedWord.split("").map((letter: string) => {
    return props.correctLetters.includes(letter) ? letter.toUpperCase() : " _ ";
  });

  return <h2>{word}</h2>;
};

export default Word;
