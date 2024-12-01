import { RecentSection } from './RecentSection'
import { ExtractionSection } from './ExtractionSection'
import { EmptyState } from './EmptyState'

export function ExtractorLayout({ pdfData }) {
  if (pdfData.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#101115] text-[#cfcfd1]">
      <header className="px-4 sm:px-6 pt-6">
        <h1 className="text-xl font-bold tracking-wide">EXTRACTIONS</h1>
      </header>

      <main className="flex-1 p-4 sm:p-6 space-y-6 sm:space-y-8">
        <RecentSection pdfData={pdfData} />
        <ExtractionSection pdfData={pdfData} />
      </main>
    </div>
  )
}

