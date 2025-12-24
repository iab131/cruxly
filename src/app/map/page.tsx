import { ClimbingMap } from "@/components/map/ClimbingMap"

export default function MapPage() {
    return (
        <div className="h-full w-full relative bg-slate-50 flex flex-col min-h-[calc(100vh-4rem)] md:min-h-screen">
            {/* 
         On Desktop: AppShell main has h-full. We want Map to fill it.
         On Mobile: Bottom nav is 4rem. 
       */}
            <ClimbingMap />
        </div>
    )
}
