'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Car, 
  Users, 
  Calendar, 
  BarChart, 
  Settings, 
  Bell,
  User,
  LogOut,
  MapPin,
  DollarSign
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'CUSTOMER' | 'DRIVER' | 'ADMIN';
  userName: string;
  userEmail: string;
}

const DashboardLayout = ({ children, userRole, userName, userEmail }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', icon: BarChart, href: '#', id: 'dashboard' },
    ];

    const customerItems = [
      { name: 'Book Ride', icon: Car, href: '#book-ride', id: 'book-ride' },
      { name: 'My Rides', icon: Calendar, href: '#rides', id: 'rides' },
      { name: 'Payment Methods', icon: DollarSign, href: '#payments', id: 'payments' },
    ];

    const driverItems = [
      { name: 'Assigned Rides', icon: Car, href: '#assigned-rides', id: 'assigned-rides' },
      { name: 'Availability', icon: Calendar, href: '#availability', id: 'availability' },
      { name: 'Earnings', icon: DollarSign, href: '#earnings', id: 'earnings' },
    ];

    const adminItems = [
      { name: 'Ride Management', icon: Car, href: '#ride-management', id: 'ride-management' },
      { name: 'Driver Management', icon: Users, href: '#drivers', id: 'drivers' },
      { name: 'Customer Management', icon: Users, href: '#customers', id: 'customers' },
      { name: 'Analytics', icon: BarChart, href: '#analytics', id: 'analytics' },
      { name: 'System Settings', icon: Settings, href: '#settings', id: 'settings' },
    ];

    switch (userRole) {
      case 'CUSTOMER':
        return [...baseItems, ...customerItems];
      case 'DRIVER':
        return [...baseItems, ...driverItems];
      case 'ADMIN':
        return [...baseItems, ...adminItems];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0A2342] text-white lg:hidden"
            >
              <SidebarContent 
                navigationItems={navigationItems}
                activePage={activePage}
                setActivePage={setActivePage}
                userName={userName}
                userEmail={userEmail}
                userRole={userRole}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#0A2342] text-white px-6 pb-4">
          <SidebarContent 
            navigationItems={navigationItems}
            activePage={activePage}
            setActivePage={setActivePage}
            userName={userName}
            userEmail={userEmail}
            userRole={userRole}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-[#E2E8F0] bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-[#64748B] lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-[#E2E8F0] lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1">
              {/* Search bar can be added here */}
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <button type="button" className="-m-2.5 p-2.5 text-[#64748B] hover:text-[#0A2342]">
                <Bell className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className="flex items-center gap-x-3">
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-[#1E293B]">{userName}</div>
                  <div className="text-xs text-[#64748B] capitalize">{userRole.toLowerCase()}</div>
                </div>
                <div className="h-8 w-8 bg-[#B0D6FF] rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-[#0A2342]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Sidebar Content Component
const SidebarContent = ({ 
  navigationItems, 
  activePage, 
  setActivePage, 
  userName, 
  userEmail, 
  userRole,
  onClose 
}: any) => {
  return (
    <>
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#B0D6FF] flex items-center justify-center">
            <Car className="w-5 h-5 text-[#0A2342]" />
          </div>
          <span className="text-xl font-semibold">Medi Rides</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigationItems.map((item: any) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setActivePage(item.id);
                      onClose?.();
                    }}
                    className={`w-full flex items-center gap-x-3 rounded-lg p-2 text-sm leading-6 font-semibold transition-colors duration-200 ${
                      activePage === item.id
                        ? 'bg-[#B0D6FF] text-[#0A2342]'
                        : 'text-[#E2E8F0] hover:text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          
          {/* User Section */}
          <li className="mt-auto">
            <div className="border-t border-white border-opacity-20 pt-4">
              <div className="flex items-center gap-x-3 px-2 py-3 text-sm font-semibold text-[#E2E8F0]">
                <div className="h-8 w-8 bg-[#B0D6FF] rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-[#0A2342]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate">{userName}</p>
                  <p className="truncate text-xs text-[#E2E8F0] text-opacity-70 capitalize">
                    {userRole.toLowerCase()}
                  </p>
                </div>
              </div>
              
              <button className="w-full flex items-center gap-x-3 rounded-lg p-2 text-sm leading-6 font-semibold text-[#E2E8F0] hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
                <LogOut className="h-5 w-5" />
                Sign out
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DashboardLayout;