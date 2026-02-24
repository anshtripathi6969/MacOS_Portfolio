import React, { useState } from "react";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

// CSS for react-pdf
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set worker for react-pdf using unpkg CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF_URL = "/files/resume.pdf";

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      className="resume-window bg-[#1e1e1e] flex flex-col overflow-hidden"
      style={{
        width: "900px",
        height: "650px",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
      }}
    >
      {/* Header */}
      <div id="window-header" className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5">
        <div className="flex items-center gap-4">
          <WindowControls target="resume" />
          <h2 className="text-white text-sm font-medium">Ansh_Tripathi_Resume.pdf</h2>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-3 bg-[#1e1e1e] px-3 py-1 rounded-full border border-white/10">
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-white text-[11px] font-medium min-w-[45px] text-center">
            {pageNumber} / {numPages || "--"}
          </span>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
            disabled={pageNumber >= numPages}
            className="text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <a
          href={PDF_URL}
          download
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-all active:scale-95"
          title="Download resume"
        >
          <Download size={14} />
          <span>Download</span>
        </a>
      </div>

      {/* PDF Viewer Container */}
      <div className="flex-1 overflow-y-auto p-6 flex justify-center bg-[#111] custom-scrollbar">
        <div className="pdf-page-container">
          <Document
            file={PDF_URL}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center h-full pt-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-400 text-sm">Opening Resume...</p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={800}
              className="shadow-2xl rounded-sm overflow-hidden"
              loading={
                <div className="h-[700px] w-[800px] bg-[#1a1a1a] animate-pulse rounded-sm"></div>
              }
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default WindowWrapper(Resume, "resume");
