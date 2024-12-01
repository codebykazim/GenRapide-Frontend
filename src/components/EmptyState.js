import { Input } from '@/components/ui/input'
import { Search, FileIcon } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col min-h-screen bg-[#101115] text-[#cfcfd1]">
      <header className="px-4 sm:px-6 pt-6">
        <h1 className="text-xl font-bold">EXTRACTIONS</h1>
      </header>

      <main className="flex-1 p-4 sm:p-6">
        <div className="bg-[#16171b] p-6 rounded-md">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-0">Extractions</h2>
            <div className="relative w-full sm:w-auto">
              <Input
                type="text"
                placeholder="Search Documents"
                className="w-full sm:w-72 h-12 sm:h-10 bg-transparent text-white placeholder-gray-400 border-transparent pr-10 pl-4 rounded-md outline outline-1 outline-gray-500 focus:outline-2 focus:outline-primary"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="overflow-x-auto mb-4 scrollbar-thin scrollbar-thumb-gray-600 hover:scrollbar-thumb-[#FF5D51] scrollbar-track-transparent">
            <div className="flex min-w-max bg-[#232428] p-2 rounded-md text-sm font-semibold text-[#f9faf9]">
              <div className="flex w-1/2">
                <div className="w-[10%] text-center">#</div>
                <div className="w-[20%] text-center">Type</div>
                <div className="w-[20%] text-center">Name</div>
              </div>
              <div className="w-[5%]"></div>
              <div className="flex w-1/2">
                <div className="w-[70%] text-right">Size</div>
                <div className="w-[15%] text-right">Date</div>
              </div>
            </div>

            <div className="font-semibold flex flex-col items-center justify-center h-64">
              <div className="relative">
                <FileIcon className="w-12 h-12 text-[#FF898B]" />
                <span
                  className="absolute bottom-0 left-0 text-xs font-bold text-[#FF898B] bg-[#16171b] px-[2px]"
                  style={{ lineHeight: '1', transform: 'translateY(4px)' }}
                >
                  PDF
                </span>
              </div>
              <p className="text-lg text-[#cfcfcf] mt-4">
                {"Sorry! No Documents Found"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

