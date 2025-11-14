import DashboardHome from "@/components/dashboard/dashboard-home";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

// This would typically come from your auth system
const getUserData = () => {
  // Mock data - replace with actual user data from your backend
  return {
    role: 'CUSTOMER' as const, // or 'DRIVER' or 'ADMIN'
    name: 'John Doe',
    email: 'john@example.com'
  };
};

// Mock data - replace with actual data fetching
const getDashboardData = (userRole: string) => {
  const baseStats = {
    totalRides: 24,
    upcomingRides: 2,
    completedRides: 22,
  };

  const roleSpecificStats = {
    CUSTOMER: baseStats,
    DRIVER: { ...baseStats, rating: 4.8 },
    ADMIN: { ...baseStats, revenue: 1250 }
  };

  const recentRides = [
    {
      id: 1,
      pickup: '123 Main St',
      dropoff: 'Medical Center',
      scheduledAt: '2024-01-15T10:00:00Z',
      status: 'COMPLETED',
      serviceType: 'MEDICAL'
    },
    {
      id: 2,
      pickup: '456 Oak Ave',
      dropoff: 'Airport',
      scheduledAt: '2024-01-16T14:30:00Z',
      status: 'ASSIGNED',
      serviceType: 'GENERAL'
    },
    {
      id: 3,
      pickup: '789 Pine Rd',
      dropoff: 'Therapy Clinic',
      scheduledAt: '2024-01-17T09:15:00Z',
      status: 'PENDING',
      serviceType: 'MEDICAL'
    }
  ];

  return {
    stats: roleSpecificStats[userRole as keyof typeof roleSpecificStats] || baseStats,
    recentRides
  };
};

export default function DashboardPage() {
  const userData = getUserData();
  const dashboardData = getDashboardData(userData.role);

  return (
    <DashboardLayout
      userRole={userData.role}
      userName={userData.name}
      userEmail={userData.email}
    >
      <DashboardHome
        userRole={userData.role}
        stats={dashboardData.stats}
        recentRides={dashboardData.recentRides}
      />
    </DashboardLayout>
  );
}