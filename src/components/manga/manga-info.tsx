import type React from "react"

interface MangaInfoProps {
  icon: React.ReactNode
  label: string
  value: string | number
}

export default function MangaInfo({ icon, label, value }: MangaInfoProps) {
  return (
    <div className="flex items-center gap-2 w-1/2 md:w-1/4 pr-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

