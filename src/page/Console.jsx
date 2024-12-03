import React, { useEffect, useState } from "react";
import useGame from "../hooks/useGame";
import Loader from "../ui/Loader";
import CountDown from "./CountDown";
import { useMyGame } from "../hooks/GameProvider";
import Heart from "../ui/Heart";

const Console = () => {
  const { phase } = useMyGame();
  return (
    <>
      {phase === "active" && <Game />}
      {phase === "inactive" && <Leveling />}
      {phase === "over" && <Finished />}
    </>
  );
};

const Game = () => {
  const { theData, loading, errorData } = useGame();
  const { dispatch } = useMyGame();
  const [userAnswer, setUserAnswer] = useState(0);
  const [feedback, setFeedback] = useState("");

  const gameData = {
    question: theData?.question, // Image URL
    solution: theData?.solution, // Correct answer
  };

  // Handle input changes
  const handleInputChange = (e) => {
    if (e.target.value === null) return;
    setUserAnswer(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer === null) return;
    if (userAnswer == gameData.solution) {
      setFeedback("Correct!");

      dispatch({ type: "gameWon" });
    } else {
      // dispatch({ type: "timeout" });
      setFeedback("Incorrect, try again!");
      dispatch({ type: "incorrect" });
    }
    setUserAnswer(""); // Clear the input field after submitting
  };

  // Handle loading and error states
  if (loading) {
    return <Loader />;
  }

  if (errorData) {
    return <div className="text-center">Error: Failed to load Image.</div>;
  }

  return (
    <div className="mt-10 grid w-full grid-cols-12 justify-items-center gap-x-4 gap-y-8">
      {/* Solution text */}
      <span className="absolute bottom-5 left-5 rounded-md bg-black px-3 py-1 text-lg text-white opacity-80">
        {gameData.solution}
      </span>

      {/* Image Section */}
      <div className="col-span-6 col-start-2 w-full max-w-3xl">
        <img
          src={gameData.question}
          alt="Question"
          className="w-full rounded-lg border-4 border-stone-400 object-contain shadow-xl"
        />
      </div>

      {/* Answer Form */}
      <div className="col-span-4 col-start-8 flex w-full max-w-md flex-col justify-start gap-5">
        <div>
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 rounded-lg border-2 border-stone-300 bg-white p-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              <label
                htmlFor="answer"
                className="text-lg font-semibold text-stone-800"
              >
                Your Answer:
              </label>
              <input
                type="number"
                id="answer"
                name="answer"
                value={userAnswer}
                onChange={handleInputChange}
                placeholder="Type your answer here"
                className="w-full rounded-lg border-2 border-stone-300 px-4 py-2 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit Answer
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`mt-4 text-lg font-semibold ${
                  feedback === "Correct!" ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback}
              </div>
            )}
          </form>
        </div>
        {/* Lives Section */}
        <div className="flex items-center justify-center">
          <LivesLeft />
        </div>

        {/* Countdown Section */}
        <div>
          <CountDown />
        </div>
      </div>
    </div>
  );
};

const Leveling = () => {
  const { dispatch } = useMyGame();
  return (
    <div className="flex w-full max-w-md flex-col gap-4 p-8">
      {/* Title */}
      <h2 className="mb-6 text-center text-2xl font-semibold text-stone-800">
        Choose Your Level
      </h2>

      {/* Level 1 Button */}
      <button
        className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => {
          console.log("Level 1 clicked");
          dispatch({ type: "selection", payload: 1 });
        }}
      >
        Level 1
      </button>

      {/* Level 2 Button */}
      <button
        className="w-full rounded-lg bg-green-500 py-3 font-semibold text-white shadow-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => {
          console.log("Level 2 clicked");
          dispatch({ type: "selection", payload: 2 });
        }}
      >
        Level 2
      </button>

      {/* Level 3 Button */}
      <button
        className="w-full rounded-lg bg-indigo-500 py-3 font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onClick={() => {
          console.log("Level 3 clicked");
          dispatch({ type: "selection", payload: 3 });
        }}
      >
        Level 3
      </button>

      {/* Level 4 Button */}
      <button
        className="w-full rounded-lg bg-teal-500 py-3 font-semibold text-white shadow-md hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
        onClick={() => {
          console.log("Level 4 clicked");
          dispatch({ type: "selection", payload: 4 });
        }}
      >
        Level 4
      </button>
    </div>
  );
};

const LivesLeft = () => {
  const { chances, usedChances, dispatch } = useMyGame();

  useEffect(() => {
    if (usedChances === 0) {
      dispatch({ type: "noChance" });
    }
  }, [usedChances, dispatch]);

  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: chances }).map((_, index) => (
        <Heart key={index} active={index < usedChances} />
      ))}
    </div>
  );
};

const Finished = () => {
  const { gameWon, cause, dispatch } = useMyGame();

  // Function to handle the restart button click
  const handleRestart = () => {
    dispatch({ type: "restart" });
  };

  return (
    <div>
      <div className="mt-20 flex items-center justify-center">
        <div className="rounded-lg border bg-white p-8 text-center shadow-lg">
          {gameWon ? (
            <div>
              <h1 className="mb-4 text-4xl font-bold text-green-500">
                You Won!
              </h1>
              <p className="mb-4 text-lg text-gray-700">
                Congratulations on your victory!
              </p>
            </div>
          ) : (
            <div>
              <h1 className="mb-4 text-4xl font-bold text-red-500">
                You Lost!
              </h1>
              <p className="mb-4 text-lg text-gray-700">
                {cause ? `Cause of loss: ${cause}` : "Better luck next time!"}
              </p>
            </div>
          )}
          <button
            onClick={handleRestart}
            className="mt-6 rounded-lg bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600"
          >
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Console;
