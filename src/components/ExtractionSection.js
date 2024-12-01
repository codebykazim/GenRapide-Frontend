'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search, FileIcon, ChevronDown, CloudDownload } from 'lucide-react'
import { downloadPdf, downloadWord } from '@/lib/download'
import * as React from 'react'

export function ExtractionSection({ pdfData }) {
  const router = useRouter()
  const [openState, setOpenState] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleChevron = useCallback((id) => {
    setOpenState((prevState) => (prevState === id ? null : id))
  }, [])

  const handleViewDetails = useCallback((pdf) => {
    const pdfDataToStore = {
      ...pdf,
      extractedData: Array.isArray(pdf.extractedData) ? pdf.extractedData : []
    }
    localStorage.setItem('currentPdfData', JSON.stringify(pdfDataToStore))
    router.push(`/pdf/${pdf.id}`)
  }, [router])

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const filteredPdfData = pdfData.filter(pdf =>
    pdf.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="bg-[#16171b] rounded-md">
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6">
        <h2 className="text-lg font-semibold hidden sm:block">Extractions</h2>
        <div className="relative w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search Documents"
            className="w-full sm:w-[300px] h-9 bg-[#16171b] text-white placeholder-gray-400 border-transparent pr-10 pl-4 rounded-md outline outline-1 outline-gray-500 focus:outline-2 focus:outline-primary"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#FF5D51]/50 hover:scrollbar-thumb-[#FF5D51] scrollbar-track-transparent">
        <table className="w-full table-auto">
          <thead>
            <tr className="poppins bg-[#232428] text-xs font-medium text-[#f9faf9]">
              <th className="py-2.5 px-6 text-left w-16">#</th>
              <th className="py-2.5 px-6 text-left w-24">Type</th>
              <th className="py-2.5 px-6 text-left flex-1">Name</th>
              <th className="py-2.5 px-10 text-right w-28">Size</th>
              <th className="py-2.5 px-12 text-right w-36">Date</th>
              <th className="py-2.5 px-1 text-right w-40"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPdfData.map((pdf) => (
              <React.Fragment key={pdf.id}>
                <tr className="poppins text-sm border-b border-gray-800">
                  <td className="py-2.5 px-6 text-left text-[#4B96F8]">{pdf.id}</td>
                  <td className="py-2.5 px-6">
                    <div className="relative flex items-center">
                      <FileIcon className="w-4 h-4 text-[#FF898B]" />
                      <span
                        className="absolute bottom-0 left-0 text-[6px] font-bold text-[#FF898B] bg-[#16171b] px-[0.5px]"
                        style={{ lineHeight: '1', transform: 'translateY(1px)' }}
                      >
                        PDF
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-6 text-left text-sm text-[#c2c3c7]">{pdf.name}</td>
                  <td className="py-2.5 px-3 text-right text-[#4B96F8]">
                    {pdf.size || 'Unknown'}
                  </td>
                  <td className="py-4 px-3 text-right text-[#c2c3c7]">
                    {pdf.date || 'N/A'}
                  </td>
                  <td className="py-2.5 px-8 flex items-center justify-end gap-7">
                    <button
                      className="p-1.5 rounded-sm hover:bg-white/10"
                      title="Download"
                      onClick={() => downloadPdf(pdf)}
                    >
                      <CloudDownload
                        className="w-4 h-4"
                        strokeWidth={2.5}
                        style={{ color: '#FFFFFF', opacity: 0.9 }}
                      />
                    </button>

                    <button
                      className="h-4 w-4 flex items-center justify-center rounded-full bg-transparent border border-[#4B96F8] text-[#4B96F8] transition-colors"
                      onClick={() => toggleChevron(pdf.id)}
                    >
                      {openState === pdf.id ? (
                        <ChevronDown className="w-3 h-3 transform rotate-180" strokeWidth={3} />
                      ) : (
                        <ChevronDown className="w-3 h-3" strokeWidth={3} />
                      )}
                    </button>
                    <button
                      onClick={() => handleViewDetails(pdf)}
                      className="h-6 px-3 text-xs font-medium bg-[#3762ef] hover:bg-[#4B96F8]/90 text-white rounded transition-colors whitespace-nowrap"
                    >
                      View Details
                    </button>
                  </td>
                </tr>

                {openState === pdf.id && (
                  <tr key={`expanded-${pdf.id}`} className="poppins text-sm border-b border-gray-800 bg-[#16171b]">
                    <td className="py-2.5 px-6"></td>
                    <td className="py-2.5 px-6 text-left">
                      <span className="text-[#4B96F8] text-xs">↳</span>
                    </td>
                    <td className="py-2.5 px-6 text-left text-[#c2c3c7]">
                      <span className="text-xs">Triaged - {pdf.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right"></td>
                    <td className="py-4 px-3 text-right"></td>
                    <td className="py-2.5 px-8 flex items-center">
                      <button
                        className="p-1.5 rounded-sm hover:bg-white/10"
                        title="Download"
                        onClick={() => downloadWord(pdf)}
                      >
                        <CloudDownload className="w-4 h-4" style={{ color: '#FFFFFF', opacity: 0.9 }} strokeWidth={3}/>
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
