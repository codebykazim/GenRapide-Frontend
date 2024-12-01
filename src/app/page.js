'use client'

import { useState, useEffect } from 'react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ExtractorLayout } from '@/components/ExtractorLayout'
import { fetchPdfData } from '@/lib/api'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [pdfData, setPdfData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPdfData()
        setPdfData(data)
      } catch (err) {
        console.error('Error occurred:', err)
        setError('An error occurred while fetching data')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return <ExtractorLayout pdfData={pdfData} />
}

