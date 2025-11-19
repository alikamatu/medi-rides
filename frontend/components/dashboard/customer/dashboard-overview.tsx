import { motion } from 'framer-motion';
import { Car, Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    { label: 'Total Rides', value: '12', icon: Car, color: 'blue' },
    { label: 'Upcoming Rides', value: '2', icon: Calendar, color: 'green' },
    { label: 'Completed', value: '10', icon: CheckCircle, color: 'green' },
    { label: 'Pending', value: '0', icon: Clock, color: 'yellow' },
  ];

  const upcomingRides = [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00 AM',
      from: '123 Main St, City',
      to: 'Medical Center, Downtown',
      status: 'confirmed',
      type: 'Medical Appointment'
    },
    {
      id: 2,
      date: '2024-01-18',
      time: '2:30 PM',
      from: 'Home Address',
      to: 'Physical Therapy Clinic',
      status: 'scheduled',
      type: 'Therapy Session'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ride Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Rides */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Rides</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingRides.map((ride) => (
              <div key={ride.id} className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{ride.type}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {ride.date} at {ride.time}
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{ride.from} → {ride.to}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ride.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ride.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;