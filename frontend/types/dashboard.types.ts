export interface DashboardStats {
  totalRides: number;
  upcomingRides: number;
  completedRides: number;
  todayRides: number;
  totalRevenue: number;
  ridesThisWeek: number;
  // Add more stats as needed
}

export interface Ride {
  id: number;
  pickup: string;
  dropoff: string;
  scheduledAt: string;
  status: string;
  serviceType: string;
  passengerName: string;
  driverName?: string;
  vehicle?: string;
  estimatedPrice?: number;
  finalPrice?: number;
  invoice?: {
    id: number;
    pdfUrl?: string;
    invoiceNumber?: string;
  };
  
  // Add more fields as needed
}

export interface AnalyticsData {
  weeklyRides: Array<{
    day: string;
    rides: number;
    revenue: number;
  }>;
  topServices: Array<{
    name: string;
    rides: number;
    revenue: number;
  }>;
}