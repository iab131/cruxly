"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/config/nav-config"
import { cn } from "@/lib/utils"

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-background font-sans text-foreground">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 border-r bg-sidebar border-sidebar-border z-30">
                <div className="p-6 border-b border-sidebar-border h-16 flex items-center">
                    <h1 className="text-2xl font-bold tracking-tight text-sidebar-primary">Cruxly</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm",
                                    isActive
                                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4 border-t border-sidebar-border mt-auto">
                    {/* Placeholder for user shorthand or settings */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/70">
                        <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs">U</div>
                        <span>User</span>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-30 flex items-center h-14 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border">
                <h1 className="text-xl font-bold text-primary">Cruxly</h1>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 pb-20 md:pb-0 min-h-0">
                {/* pb-20 for mobile bottom nav spacing */}
                <div className="h-full">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border h-16 safe-area-pb">
                <div className="grid h-full grid-cols-4 items-center">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 h-full w-full transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                <item.icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}
