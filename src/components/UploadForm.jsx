import React, { useState } from "react";
import RequirementsInput from "./RequirementsInput";
import ResumeInput from "./ResumeInput";
import ActionsSection from "./ActionsSection";
import ResultMessage from "./ResultMessage";
import { CubeIcon } from "@heroicons/react/24/solid";

export default function UploadForm({
  onUpload,
  isLoading,
  matchPercentage,
  finalResult,
  downloadLink,
}) {
  const [requirementsFile, setRequirementsFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [requirementsText, setRequirementsText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [includeRequirements, setIncludeRequirements] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (includeRequirements) {
      if (requirementsText)
        formData.append("requirementsText", requirementsText);
      if (requirementsFile)
        formData.append("requirementsFile", requirementsFile);
    }

    if (resumeText) formData.append("resumeText", resumeText);
    if (resumeFile) formData.append("resumeFile", resumeFile);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    onUpload(formData);
  };

  const handleCancelProcessing = () => {
    // cancel functionality here...
    console.log("Processing cancelled");
  };

  return (
    <div className="min-h-screen bg-[#101115] text-[#cccfd0] p-6 flex justify-center">
      <div className="max-w-4xl w-full z-50 relative">
        <div className="flex justify-between items-center mb-6 flex-wrap">
          <h1 className="text-1xl font-bold">PRORESHAPE</h1>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-sm">Include requirements</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ease-in-out ${
                  includeRequirements
                    ? "translate-x-4 bg-blue-600"
                    : "translate-x-0 bg-white"
                }`}
                checked={includeRequirements}
                onChange={() => setIncludeRequirements(!includeRequirements)}
              />
              <label
                htmlFor="toggle"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                  includeRequirements ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></label>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {includeRequirements && (
              <RequirementsInput
                requirementsText={requirementsText}
                setRequirementsText={setRequirementsText}
                setRequirementsFile={setRequirementsFile}
              />
            )}
            <ResumeInput
              resumeText={resumeText}
              setResumeText={setResumeText}
              setResumeFile={setResumeFile}
            />
          </div>

          {isLoading ? (
            <div className="bg-[#1E1E1E] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CubeIcon className="h-6 w-6 text-orange-500 animate-pulse" />
                  <span className="text-[#cccfd0]">
                    Generating Content (Analyze)
                  </span>
                </div>
                <button
                  onClick={handleCancelProcessing}
                  className="px-4 py-2 bg-[#232428] text-[#cccfd0] rounded hover:bg-[#2a2b2f] transition-colors"
                >
                  Cancel Processing
                </button>
              </div>
            </div>
          ) : (
            matchPercentage !== null && (
              <ResultMessage
                matchPercentage={matchPercentage}
                finalResult={finalResult}
                downloadLink={downloadLink}
              />
            )
          )}

          <ActionsSection handleSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
}
