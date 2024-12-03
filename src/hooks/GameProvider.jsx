import { createContext, useContext, useReducer } from "react";

const GameContext = createContext();

const firstState = {
  phase: "inactive", // active, inactive, over
  level: 0,
  chances: 0,
  usedChances: 0,
  timeRemains: 0,
  gameWon: false,
  cause: "",
  mode: false,
};

const pickLevel = (lvl) => {
  switch (lvl) {
    case 1:
      return {
        timeRemains: 300,
        level: 1,
        chances: 5,
        usedChances: 5,
        mode: true,
      };
    case 2:
      return {
        timeRemains: 240,
        level: 2,
        chances: 4,
        usedChances: 4,
        mode: true,
      };
    case 3:
      return {
        timeRemains: 180,
        level: 3,
        chances: 3,
        usedChances: 3,
        mode: true,
      };
    case 4:
      return {
        timeRemains: 120,
        level: 4,
        chances: 2,
        usedChances: 2,
        mode: true,
      };
    default:
      return firstState;
  }
};

function reducer(state, action) {
  switch (action.type) {
    // lives & time decision
    case "selection":
      return { ...state, ...pickLevel(action.payload), phase: "active" };

    // -1 live
    case "incorrect":
      return {
        ...state,
        phase: "active",
        usedChances: state.usedChances - 1,
        cause: "Incorrect Answer.",
      };
    // judgement tab, cause: out of lives
    case "noChance":
      return { ...state, phase: "over", cause: "Out of lives" };
    // judgement tab, cause: out of time
    case "timeout":
      return {
        ...state,
        phase: "over",
        cause: "Out of time!!",
        gameWon: false,
      };
    // judgement tab, cause: Won the game
    case "gameWon":
      return {
        ...state,
        phase: "over",
        gameWon: true,
        cause: "Game Won!!",
      };
    // End of the game.
    case "judgement":
      return { ...state };

    case "restart":
      return { ...firstState, phase: "inactive" };
    // leave -> judgement tab, cause: quited game
    case "exit":
      return { firstState };
    default:
      return { ...state };
  }
}

export default function GameProvider({ children }) {
  const [
    { phase, timeRemains, chances, usedChances, gameWon, cause },
    dispatch,
  ] = useReducer(reducer, firstState);

  return (
    <GameContext.Provider
      value={{
        timeRemains,
        phase,
        chances,
        usedChances,
        gameWon,
        cause,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useMyGame() {
  const context = useContext(GameContext);
  if (context === undefined) return null;
  return context;
}
