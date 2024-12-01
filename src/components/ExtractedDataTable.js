"use client";

import { useState, useCallback } from "react";
import axios from "axios";

export function ExtractedDataTable({ data = [], pdfName = [] }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = useCallback((id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const formatText = useCallback((text) => {
    return text.split("\n").map((line, index) => {
      const sanitizedLine = line
        .replace(/^#{1,}/g, "")
        .replace(/[*_]/g, "")
        .trim();

      if (!sanitizedLine) {
        return <br key={index} />;
      }

      if (line.startsWith("###")) {
        return (
          <h4 key={index} className="text-md font-semibold text-[#dcdcdc] mb-2">
            {sanitizedLine}
          </h4>
        );
      }

      if (line.startsWith("##")) {
        return (
          <h3 key={index} className="text-lg font-semibold text-[#ffffff] mb-4">
            {sanitizedLine}
          </h3>
        );
      }

      return (
        <p key={index} className="text-sm text-[#dcdcdc] mb-2">
          {sanitizedLine}
        </p>
      );
    });
  }, []);

  const handlePdfDownload = useCallback(async () => {
    try {
      const pdfFileName = Array.isArray(pdfName) && pdfName.length > 0 ? pdfName[0].name : pdfName;

      if (!pdfFileName) {
        console.error("PDF name is missing or invalid.");
        return;
      }

      const cleanFileName = pdfFileName.replace(/\.pdf$/, "");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rewriter/download-pdf/${pdfFileName}`,
        { responseType: "blob" }
      );

      const contentType = response.headers["content-type"];
      if (!contentType || !contentType.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        console.error("Unexpected file type received:", contentType);
        return;
      }

      const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", `${cleanFileName}.docx`);
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.parentNode.removeChild(fileLink);

      console.log("Download triggered successfully");
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  }, [pdfName]);

  if (data.length === 0) {
    return (
      <div className="bg-[#16171B] overflow-hidden p-4">
        <div className="text-center text-[#808080]">
          No extracted data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#16171B] overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg text-[#cfcfd1]">Extracted Data</h2>
        <button
          onClick={handlePdfDownload}
          className="bg-[#3b64eb] hover:bg-[#4B96F8]/90 text-white px-4 py-1.5 text-sm rounded"
        >
          Export to WORD
        </button>
      </div>

      <div className="p-4">
        <div style={{ border: "1px solid rgb(47, 47, 47)", borderRadius: "0" }}>
          <table className="w-full">
            <thead>
              <tr>
                <th
                  className="py-3 px-4 text-left text-sm font-normal"
                  style={{
                    borderRight: "1px solid rgb(47, 47, 47)",
                    borderBottom: "1px solid rgb(47, 47, 47)",
                  }}
                >
                  #
                </th>
                <th
                  className="py-3 px-4 text-left text-sm font-normal"
                  style={{
                    borderRight: "1px solid rgb(47, 47, 47)",
                    borderBottom: "1px solid rgb(47, 47, 47)",
                  }}
                >
                  Title
                </th>
                <th
                  className="py-3 px-4 text-left text-sm font-normal"
                  style={{
                    borderBottom: "1px solid rgb(47, 47, 47)",
                  }}
                >
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td
                    className="py-4 px-4 w-[60px] text-sm"
                    style={{
                      color: "#cfcfd1",
                      borderRight: "1px solid rgb(47, 47, 47)",
                      borderBottom: index !== data.length - 1 ? "1px solid rgb(47, 47, 47)" : "none",
                      verticalAlign: "top",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    className="py-4 px-4 w-[300px] text-sm"
                    style={{
                      borderRight: "1px solid rgb(47, 47, 47)",
                      borderBottom: index !== data.length - 1 ? "1px solid rgb(47, 47, 47)" : "none",
                      color: "#cfcfd1",
                      verticalAlign: "top",
                    }}
                  >
                    {item.title}
                  </td>
                  <td
                    className="py-4 px-4 text-sm"
                    style={{
                      borderBottom: index !== data.length - 1 ? "1px solid rgb(47, 47, 47)" : "none",
                      color: "#dcdcdc",
                      verticalAlign: "top",
                    }}
                  >
                    <div>
                      <div
                        className={`text-[#dcdcdc] ${
                          expandedRows[index] ? "" : "line-clamp-1"
                        }`}
                      >
                        {expandedRows[index]
                          ? formatText(item.data).map((component) => component)
                          : item.data}
                      </div>
                      <button
                        onClick={() => toggleRow(index)}
                        className="ml-1 text-[#4B96F8] hover:text-[#4B96F8]/80 inline"
                        style={{ display: "inline", whiteSpace: "nowrap" }}
                      >
                        Show {expandedRows[index] ? "Less" : "More"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
