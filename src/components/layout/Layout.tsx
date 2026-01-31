import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function Layout({ children, pageTitle = "Dashboard" }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="lg:ml-64">
        <Header
          title={pageTitle}
          onMenuToggle={() => setIsSidebarOpen(true)}
        />

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
