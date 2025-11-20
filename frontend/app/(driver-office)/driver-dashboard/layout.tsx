interface DriverDashboardLayoutProps {
  children: React.ReactNode;
}

export default function DriverDashboardLayout({ children }: DriverDashboardLayoutProps) {
  return (
    <div className="driver-dashboard-layout">
      {/* You can add a sidebar or header specific to the driver dashboard here */}
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}