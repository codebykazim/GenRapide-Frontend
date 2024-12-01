import { Loader2 } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#101115]">
      <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
    </div>
  )
}

