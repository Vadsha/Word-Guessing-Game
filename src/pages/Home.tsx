import { letters } from "@/assets/letters";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Grid = ({
  guesses,
  answer,
}: {
  guesses: Array<string | null>;
  answer: string;
}) => {
  return (
    <div>
      {guesses.map((guess, index) => (
        <div key={index} className="flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-20 h-20 border">
              {guess ? (
                <p
                  className={`${
                    guess[i] === answer[i]
                      ? "bg-green-300"
                      : answer.split("").includes(guess[i])
                      ? "bg-yellow-300"
                      : "bg-gray-100"
                  }  flex h-full border border-gray-200 justify-center items-center text-lg font-semibold uppercase`}
                >
                  {guess[i]}
                </p>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const [answer, setAnswer] = useState("");
  const [guesses, setGuesses] = useState<Array<null | string>>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    setAnswer(letter);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (guesses.filter((guess) => guess == null).length == 0) {
        setHasFailed(true);
        return;
      }
      if (e.key == "Backspace") {
        setCurrentGuess((oldGuess) => oldGuess.slice(0, -1));
        return;
      }
      if (e.key == "Enter") {
        if (currentGuess.length == 5) {
          const currentGuessIndex = guesses.findIndex((guess) => guess == null);
          if (currentGuessIndex < 5) {
            const newGuesses = [...guesses];
            newGuesses[currentGuessIndex] = currentGuess;
            setGuesses(() => newGuesses);
            setCurrentGuess("");
          } else {
            return;
          }
        } else {
          return;
        }
      }
      const isAlphabetic = /^[A-Za-z]+$/.test(e.key);
      const notActualLetter =
        e.key == "Enter" ||
        e.key == "Alt" ||
        e.key == "Control" ||
        e.key == "Tab" ||
        e.key == "CapsLock" ||
        e.key == "Shift";
      if (isAlphabetic && !notActualLetter) {
        if (currentGuess.length == 5) {
          console.log(currentGuess.length);
          return;
        }
        setCurrentGuess((oldGuess) => oldGuess + e.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, guesses]);

  return (
    <div className="w-screen flex-col h-screen flex justify-center items-center gap-12">
      <h1 className="text-2xl font-semibold">Guess a five letter word</h1>
      <Grid answer={answer} guesses={guesses} />
      {hasFailed || guesses.filter((guess) => guess == null).length == 0 ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <h2 className="text-red-500">You have failed to guess the word.</h2>
          <p>Answer - {answer}</p>
          <Button
            className="w-[180px] cursor-pointer"
            onClick={() => {
              setAnswer(letters[Math.floor(Math.random() * letters.length)]);
              setGuesses([null, null, null, null, null]);
              setCurrentGuess("");
              setHasFailed(false);
            }}
          >
            Reset
          </Button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <p>Current Guess - </p>
          {[0, 1, 2, 3, 4].map((i) => (
            <p
              key={i}
              className="w-10 h-10 border rounded-lg flex justify-center items-center"
            >
              {currentGuess[i]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
