import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace) {
    if (replace === true) {
      const index = history.indexOf(mode);
      // transition(THIRD, true) means history=[ONE, THREE] instead of history=[ONE, TWO, THREE]
      setHistory([...history], history.splice(index, 1));
    }
    setMode(mode);
    setHistory([...history, mode]);
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      setHistory(history.slice(0, -1));
    }
  }

  return { mode, transition, back }
}