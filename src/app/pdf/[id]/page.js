'use client'

import { useState, useEffect } from 'react'
import { FileIcon } from 'lucide-react'
import { ExtractedDataTable } from '@/components/ExtractedDataTable'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import axios from 'axios'

export default function PDFDetailsPage({ params }) {
  const [pdfData, setPdfData] = useState(null)

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('currentPdfData')
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        console.log("Retrieved PDF data:", parsedData)
        // Ensure extractedData is always an array
        parsedData.extractedData = Array.isArray(parsedData.extractedData) ?
          parsedData.extractedData : []
        setPdfData(parsedData)
      } else {
        console.warn("No PDF data found in localStorage")
      }
    } catch (error) {
      console.error("Error parsing PDF data:", error)
      setPdfData({ extractedData: [] })
    }
  }, [])

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rewriter/download-blob/${pdfData.name}`,
        {
          params: { documentId: pdfData.id },
          responseType: 'blob', // Important: ensures the response is treated as a file
        }
      );

      // Create a Blob from the response data
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;

      // Set the downloaded file name
      fileLink.setAttribute('download', pdfData.name || 'document.pdf');

      // Append the link to the document and trigger the download
      document.body.appendChild(fileLink);
      fileLink.click();

      // Clean up by removing the temporary link
      fileLink.parentNode.removeChild(fileLink);
      console.log('Download triggered successfully');
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  if (!pdfData) {
    return <LoadingSpinner/>
  }

  return (
    <div className="poppins min-h-screen bg-[#101115] text-[#cfcfd1] p-6 space-y-6">
      <div className="text-sm font-semibold">
        EXTRACTIONS / {pdfData.name.toUpperCase()}
      </div>

      <div className="bg-[#16171B] rounded-lg">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <FileIcon className="w-20 h-20 text-[#FF898B]" />
            <span
              className="absolute bottom-0 left-0 text-xl font-bold text-[#FF898B] bg-[#16171B] px-[2px]"
              style={{ lineHeight: '1', transform: 'translateY(4px)' }}
            >
              PDF
            </span>
          </div>
          <h1 className="mt-8 text-lg">{pdfData.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-[#c6c7cb]">
            <span>Date <span className="text-[#3763e3]">{pdfData.date}</span></span>
            <span>|</span>
            <span>Size <span className="text-[#3763e3]">{pdfData.size}</span></span>
            <span>|</span>
            <span>Pages Count <span className="text-[#3763e3]">{pdfData.pages}</span></span>
          </div>
          <button onClick={handleDownload} className="mt-6 px-4 py-2 bg-[#232428] rounded flex items-center gap-2 text-[#f3f4f4] hover:bg-[#2c2d32] transition-colors">
            Download Document
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      </div>

      <ExtractedDataTable data={pdfData.extractedData|| []} pdfName={pdfData.name}/>
    </div>
  )
}
