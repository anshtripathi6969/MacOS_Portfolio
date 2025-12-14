import WindowControls from '#components/WindowControls';
import WindowWrapper from '#hoc/WindowWrapper';
import { Download } from 'lucide-react';
import React from 'react';

const PDF_URL = '/files/resume.pdf';

const Resume = () => {
  return (
    <div
      className="resume-window"
      style={{
        width: '800px',
        height: '600px',
        background: '#1e1e1e',
        display: 'flex',
        flexDirection: 'column',
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

      {/* PDF */}
      <div style={{ flex: 1 }}>
        <iframe
          src={PDF_URL}
          title="Resume PDF"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default WindowWrapper(Resume, 'resume');
