import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      // transition(THIRD, true) means history=[ONE, THREE] instead of history=[ONE, TWO, THREE]
      // setHistory([...history.slice(0, history.length - 1), mode]);
      setHistory(prev => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      // setHistory([...history, mode]);
      setHistory(prev => [...prev, mode])
    }
    setMode(mode);
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      // setHistory(history.slice(0, -1));
      setHistory(prev => prev.slice(0, -1));
    }
  }

  return { mode, transition, back }
}