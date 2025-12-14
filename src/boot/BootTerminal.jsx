import React, { useEffect, useState } from "react";
import { TERMINAL_SCRIPT } from "./bootSteps";

const BootTerminal = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (cursor < TERMINAL_SCRIPT.length) {
      const t = setTimeout(() => {
        setLines((l) => [...l, TERMINAL_SCRIPT[cursor]]);
        setCursor((c) => c + 1);
      }, 700);
      return () => clearTimeout(t);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [cursor, onComplete]);

  return (
    <div className="text-green-400 font-mono text-sm space-y-1">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div>@ansh % █</div>
    </div>
  );
};

export default BootTerminal;
