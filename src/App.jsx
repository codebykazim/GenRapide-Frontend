import axios from "axios";
import React, { useState } from "react";
import UploadForm from "./components/UploadForm";

export default function App() {
  const [matchPercentage, setMatchPercentage] = useState(null);
  const [finalResult, setFinalResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const handleUpload = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/v1/rewriter/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const responseData = response.data;
      console.log("Response data:", responseData);

      setMatchPercentage(responseData.matchPercentage);
      setFinalResult(responseData.finalResult);
      setDownloadLink(responseData.downloadLink);
      console.log(responseData.downloadLink);
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App bg-[#101115] min-h-screen">
      <UploadForm
        onUpload={handleUpload}
        isLoading={isLoading}
        matchPercentage={matchPercentage}
        finalResult={finalResult}
        downloadLink={downloadLink}
      />
    </div>
  );
}
