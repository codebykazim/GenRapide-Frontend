'use client'

import React, { useState, useMemo } from 'react'
import { FileIcon, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function RecentSection({ pdfData }) {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleViewDetails = (pdf) => {
    const pdfDataToStore = {
      ...pdf,
      extractedData: Array.isArray(pdf.extractedData) ? pdf.extractedData : []
    }
    localStorage.setItem('currentPdfData', JSON.stringify(pdfDataToStore))
    router.push(`/pdf/${pdf.id}`)
  }

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  // Filter recent PDFs (within last 3 days)
  const recentPdfs = useMemo(() => {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    return pdfData
      .filter(pdf => {
        const pdfDate = new Date(pdf.date)
        return pdfDate > threeDaysAgo
      })
      .slice(0, 2) // Still only show max 2 items
  }, [pdfData])

  // Don't render the section if there are no recent PDFs
  if (recentPdfs.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="poppins text-lg font-semibold mb-4">Recent</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
        {recentPdfs.map((pdf) => (
          <div key={pdf.id} className="bg-[#16171b] p-3 rounded-md">
            <div className="flex flex-col h-[85px]">
              <div className="flex justify-between items-start mb-2">
                <div className="relative">
                  <FileIcon className="w-8 h-8 text-[#FF898B]" />
                  <span
                    className="poppins absolute bottom-0 left-0 text-[9px] font-semibold text-[#FF898B] bg-[#16171b] px-[1px]"
                    style={{ lineHeight: '1', transform: 'translateY(2px)' }}
                  >
                    PDF
                  </span>
                </div>
                <div className="relative">
                  <button
                    className="text-gray-400 hover:text-white p-1 rounded-sm hover:bg-white/10"
                    onClick={() => toggleDropdown(pdf.id)}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {openDropdown === pdf.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#16171b] border border-gray-800 rounded-md shadow-lg z-10">
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-[#cfcfd1] hover:bg-white/10 focus:outline-none focus:bg-white/10"
                        onClick={() => handleViewDetails(pdf)}
                      >
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#4B96F8]">{pdf.name}</p>
                <p className="text-xs text-gray-400">Pages {pdf.pages} | Size {pdf.size}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

