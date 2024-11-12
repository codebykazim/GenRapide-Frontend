import React from "react";

export default function ActionsSection({ handleSubmit }) {
  return (
    <div className="bg-[#1E1E1E] rounded-lg p-4">
      <h2 className="text-lg font-medium mb-2">Actions</h2>
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <select
            className="w-full bg-[#232428] text-white py-2 px-4 pr-8 rounded appearance-none focus:outline-none cursor-pointer"
            defaultValue="Analyze"
          >
            <option value="Analyze">Analyze</option>
            <option value="Check Plagiarism">Check Plagiarism</option>
          </select>
          <div className="absolute right-0 top-0 bottom-0 flex items-center px-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Analyze
        </button>
      </div>
    </div>
  );
}
