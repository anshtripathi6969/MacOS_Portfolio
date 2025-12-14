import WindowControls from '#components/WindowControls';
import WindowWrapper from '#hoc/WindowWrapper';
import { Download } from 'lucide-react';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import "react-pdf/dist/page/AnnotationLayer.css";
import "react-pdf/dist/page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="/files/Resume_AnshTripathi.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>

      <Document 
        file="/files/Resume_AnshTripathi.pdf"
        onLoadError={(err) => console.error("PDF Load Error:", err)}
      >
        <Page 
          pageNumber={1}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
