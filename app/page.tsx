'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import RacingCalendar from "@/components/main/calendar"

export default function Home() {
  return (
    <div>
      <header>
        <div>
          <h1 className="text-center text-5xl z-50 pt-5">Racing Calendar</h1>
        </div>
        <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center border-b px-4">
          <SidebarTrigger className="-ml-1" aria-label="toogle sidebar" />
        </header>
      </SidebarInset>
    </SidebarProvider>
      </header>

      <section>
        <div>
          <RacingCalendar/>
        </div>
      </section>
    </div>
  );
}
