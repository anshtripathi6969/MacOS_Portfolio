import React from "react";
import useBootStore from "#store/bootStore";
import BootLogs from "./BootLogs";
import BootTerminal from "./BootTerminal";

const BootScreen = () => {
  const { stage, next } = useBootStore();

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-9999"
    >
      <div className="w-[600px] max-w-full px-6">
        {stage === "boot" && <BootLogs onComplete={next} />}
        {stage === "terminal" && <BootTerminal onComplete={next} />}
      </div>
    </div>
  );
};

export default BootScreen;
