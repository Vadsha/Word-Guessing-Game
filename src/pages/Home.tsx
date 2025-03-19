import { letters } from "@/assets/letters";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";

const isMobile = window.innerWidth < 768;

const Grid = ({
  guesses,
  answer
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [answer, setAnswer] = useState("");
  const [guesses, setGuesses] = useState<Array<null | string>>(
    Array(5).fill(null)
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [hasFailed, setHasFailed] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>) => {
      if (guesses.includes(answer)) {
        return;
      }
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
          return;
        }
        setCurrentGuess((oldGuess) => oldGuess + e.key);
      }
    },
    [answer, guesses, currentGuess]
  );

  useEffect(() => {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    setAnswer(letter);
  }, []);

  useEffect(() => {
    if (inputRef.current && isMobile) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="w-screen flex-col h-screen flex justify-center items-center gap-12">
      <h1 className="text-2xl font-semibold">Guess a five letter word</h1>
      <Grid answer={answer} guesses={guesses} />
      {guesses.includes(answer) ? (
        <div>
          <h2 className="text-green-500 text-center text-xl mb-2">
            YAY! You won!
          </h2>
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
      ) : null}
      {hasFailed || guesses.filter((guess) => guess == null).length == 0 ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          {guesses.includes(answer) ? (
            <h2 className="text-green-500 text-xl mb-2">YAY! You won!</h2>
          ) : (
            <h2 className="text-red-500 text-xl mb-2">
              You have failed to guess the word.
            </h2>
          )}
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
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex gap-4 items-center"
        >
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className="absolute opacity-0 pointer-events-none"
            onKeyDown={(e) => {
              if (isMobile) {
                handleKeyDown(e);
              }
            }}
          />
          <p>Current Guess - </p>
          {[0, 1, 2, 3, 4].map((i) => (
            <p
              key={i}
              id={`letter${i}`}
              className="w-10 h-10 border rounded-lg flex justify-center items-center"
            >
              {i == 0 && currentGuess.length == 0 ? (
                <span className="animate-pulse">|</span>
              ) : (
                currentGuess[i]
              )}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
