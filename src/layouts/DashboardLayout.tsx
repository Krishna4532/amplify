import React from 'react';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Responsive Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-black text-white shadow-lg shadow-blue-200">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">AMPLIFY</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div className="hidden items-center gap-3 md:flex">
              <div className="h-8 w-px bg-slate-200"></div>
              <span className="text-sm font-medium text-slate-600">Krishna</span>
              <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna" alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Feed (Left) - Takes 8 columns on desktop, full width on mobile */}
          <div className="lg:col-span-8 space-y-8">
            {children}
          </div>

          {/* Sidebar (Right) - Takes 4 columns on desktop, full width on mobile */}
          <aside className="lg:col-span-4 h-fit sticky top-24">
            {/* The Leaderboard will be injected here via App.tsx */}
            <div id="sidebar-target"></div>
          </aside>
        </div>
      </main>
    </div>
  );
};