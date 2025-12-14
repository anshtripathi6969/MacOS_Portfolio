import React, { useEffect, useState } from "react";
import { BOOT_LOGS } from "./bootSteps";

const BootLogs = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < BOOT_LOGS.length) {
      const t = setTimeout(() => setIndex((i) => i + 1), 550);
      return () => clearTimeout(t);
    } else {
      setTimeout(onComplete, 800);
    }
  }, [index, onComplete]);

  return (
    <div className="text-green-400 font-mono text-sm space-y-1">
      {BOOT_LOGS.slice(0, index).map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
};

export default BootLogs;
