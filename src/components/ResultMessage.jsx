import React, { useState } from "react";
import {
  ArrowsPointingOutIcon,
  DocumentArrowDownIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function ResultMessage({
  matchPercentage,
  finalResult,
  downloadLink,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleExportToWord = (e) => {
    e.preventDefault();
    if (downloadLink) {
      try {
        const link = document.createElement("a");
        link.href = downloadLink;
        link.download = "analysis-result.docx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading the file:", error);
        alert("Error downloading file: " + error.message);
      }
    } else {
      alert("Download link not available.");
    }
  };

  const formatContent = (content) => {
    if (!content) return [];

    return content
      .split("\n")
      .map((line) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return {
            type: "header",
            content: line.replace(/\*\*/g, "").trim(),
          };
        } else if (/^\d+\.\s*\*\*.*\*\*:/.test(line)) {
          const [number, ...rest] = line.split(".");
          const text = rest.join(".").trim();

          const titleMatch = text.match(/\*\*(.*?)\*\*:\s*(.*)/);
          if (titleMatch) {
            return {
              type: "suggestion",
              number: number.trim(),
              title: titleMatch[1],
              description: titleMatch[2],
            };
          }
        } else if (line.startsWith("-")) {
          return {
            type: "bullet",
            content: line.substring(1).trim(),
          };
        } else {
          return {
            type: "text",
            content: line.trim(),
          };
        }
      })
      .filter((item) => item?.content || item?.title);
  };

  const formattedContent = formatContent(finalResult);

  return (
    <div
      className={`bg-[#1E1E1E] rounded-lg transition-all duration-300 ${
        isFullscreen
          ? "fixed top-0 left-0 w-full h-full z-50 overflow-auto"
          : ""
      }`}
    >
      <div className="border-b border-gray-800 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[#cccfd0]">
              Analysis Result
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400">
              <CheckCircleIcon className="w-4 h-4" />
              <span>{matchPercentage}% Match</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportToWord}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              <span>Export to Word</span>
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowsPointingOutIcon className="w-5 h-5 text-[#cccfd0]" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {formattedContent.map((item, index) => {
          if (item.type === "header") {
            return (
              <div
                key={index}
                className="flex items-center gap-2 pt-4 first:pt-0"
              >
                <InformationCircleIcon className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-[#cccfd0] border-b border-gray-800 pb-2">
                  {item.content}
                </h3>
              </div>
            );
          } else if (item.type === "suggestion") {
            return (
              <div key={index} className="flex items-start gap-3 pl-7">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-blue-400 font-medium">
                    {item.number}.
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-[#cccfd0] font-medium">{item.title}</h4>
                    <p className="text-[#9ca3af] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          } else if (item.type === "bullet") {
            return (
              <div
                key={index}
                className="flex items-start gap-3 pl-7 text-[#9ca3af]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 flex-shrink-0" />
                <p className="leading-relaxed">{item.content}</p>
              </div>
            );
          } else {
            return (
              <p key={index} className="text-[#9ca3af] pl-7 leading-relaxed">
                {item.content}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}
