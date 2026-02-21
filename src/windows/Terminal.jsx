import React, { useEffect, useRef, useState } from "react";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { techStack } from "#constants";
import useWindowStore from "#store/window";

const PROMPT = "@ansh %";

const Terminal = () => {
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const { openWindow } = useWindowStore();

  const [history, setHistory] = useState([
    { type: "output", value: "Welcome to AnshOS Terminal" },
    { type: "output", value: "Type `help` to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [cursor, setCursor] = useState(true);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);

  // Cursor blink
  useEffect(() => {
    const i = setInterval(() => setCursor(c => !c), 500);
    return () => clearInterval(i);
  }, []);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    let output = [];

    switch (command) {
      case "help":
        output = [
          "Available commands:",
          "help       - show commands",
          "tech       - show tech stack",
          "projects   - open projects",
          "resume     - open resume",
          "contact    - open contact",
          "whoami     - user info",
          "neofetch   - system info",
          "clear      - clear terminal",
        ];
        break;

      case "tech":
        techStack.forEach(({ category, items }) => {
          output.push(`${category}: ${items.join(", ")}`);
        });
        break;

      case "projects":
        openWindow("finder");
        output = ["Opening Projects…"];
        break;

      case "resume":
        openWindow("resume");
        output = ["Opening Resume…"];
        break;

      case "contact":
        openWindow("contact");
        output = ["Opening Contact…"];
        break;

      case "whoami":
        output = ["Ansh Tripathi — Full Stack Developer"];
        break;

      case "neofetch":
        output = [
          "AnshOS 1.0",
          "----------------",
          "OS: macOS-inspired Web",
          "Shell: Ansh Terminal",
          "CPU: JavaScript",
          "GPU: GSAP",
          "WM: React + Zustand",
        ];
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        output = [`command not found: ${command}`];
    }

    setHistory(h => [
      ...h,
      { type: "command", value: cmd },
      ...output.map(v => ({ type: "output", value: v })),
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!input.trim()) return;
      runCommand(input);
      setCmdHistory(h => [input, ...h]);
      setCmdIndex(-1);
      setInput("");
    }

    if (e.key === "ArrowUp") {
      const next = cmdIndex + 1;
      if (cmdHistory[next]) {
        setCmdIndex(next);
        setInput(cmdHistory[next]);
      }
    }

    if (e.key === "ArrowDown") {
      const prev = cmdIndex - 1;
      if (prev >= 0) {
        setCmdIndex(prev);
        setInput(cmdHistory[prev]);
      } else {
        setCmdIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <>
      {/* HEADER */}
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Terminal</h2>
      </div>

      {/* BODY */}
      <div
        className="terminal-body"
        onClick={() => inputRef.current?.focus()}
        style={{
          flex: 1,
          padding: "16px",
          fontFamily: "Roboto Mono, monospace",
          fontSize: "14px",
          lineHeight: "1.6",
          overflowY: "auto",
          background: "#000",
          color: "#e5e5e5",
        }}
      >
        {history.map((line, i) => (
          <div key={i}>
            {line.type === "command" ? (
              <p>
                <span className="font-bold">{PROMPT}</span> {line.value}
              </p>
            ) : (
              <p className="opacity-80">{line.value}</p>
            )}
          </div>
        ))}

        {/* INPUT LINE */}
        <div className="flex">
          <span className="font-bold mr-2">{PROMPT}</span>
          <span>{input}</span>
          <span>{cursor ? "█" : " "}</span>
        </div>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ opacity: 0, position: "absolute" }}
        />

        <div ref={bottomRef} />
      </div>
    </>
  );
};

export default WindowWrapper(Terminal, "terminal");
