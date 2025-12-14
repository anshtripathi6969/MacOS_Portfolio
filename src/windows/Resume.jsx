import React from "react";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";

const PDF_URL = "/files/resume.pdf";

const Resume = () => {
  return (
    <div
      className="resume-window"
      style={{
        width: "900px",
        height: "650px",
        background: "#1e1e1e",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a href={PDF_URL} download title="Download resume">
          <Download className="icon" />
        </a>
      </div>

      {/* PDF Viewer */}
      <div style={{ flex: 1 }}>
        <iframe
          src={PDF_URL}
          title="Resume PDF"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

// 🔥 THIS WAS MISSING
export default WindowWrapper(Resume, "resume");
