import React, { useState } from "react";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function RequirementsInput({
  requirementsText,
  setRequirementsText,
  setRequirementsFile,
}) {
  const [expandRequirements, setExpandRequirements] = useState(false);

  const wordCount = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <div
      className={`bg-[#1E1E1E] rounded-lg p-4 transition-all duration-300 ${
        expandRequirements
          ? "fixed top-0 left-0 w-full h-full z-50 bg-[#1E1E1E] p-6"
          : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Requirements</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">
            {wordCount(requirementsText)} Words
          </span>
          <button
            type="button"
            onClick={() => setExpandRequirements(!expandRequirements)}
            className="text-gray-400 hover:text-white"
          >
            <ArrowsPointingOutIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      {expandRequirements ? (
        <>
          <textarea
            value={requirementsText}
            onChange={(e) => setRequirementsText(e.target.value)}
            placeholder="Enter Your Requirements."
            className="w-full h-[calc(100vh-200px)] bg-[#1E1E1E] text-white placeholder-gray-500 resize-none focus:outline-none"
          ></textarea>
          <button
            type="button"
            onClick={() => setExpandRequirements(false)}
            className="text-gray-400 hover:text-white mt-2"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </>
      ) : (
        <textarea
          value={requirementsText}
          onChange={(e) => setRequirementsText(e.target.value)}
          placeholder="Enter Your Requirements."
          className="w-full h-64 bg-[#1E1E1E] text-white placeholder-gray-500 resize-none focus:outline-none"
        ></textarea>
      )}
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setRequirementsFile(e.target.files[0])}
        className="mt-2 text-sm text-gray-400"
      />
    </div>
  );
}
