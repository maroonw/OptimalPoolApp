import React from 'react';
import { Link } from 'react-router-dom';

function HomeownerDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Homeowner Dashboard</h1>
      
      {/* Links to pages */}
      <nav className="mb-8">
        <ul className="flex flex-wrap gap-4">
          <li><Link to="/pages/homeowner/maintenancelog" className="text-blue-500 hover:text-blue-700">Maintenance Log</Link></li>
          <li><Link to="/pages/homeowner/chemicaltracker" className="text-blue-500 hover:text-blue-700">Chemical Tracker</Link></li>
          <li><Link to="/pages/homeowner/cleaningschedule" className="text-blue-500 hover:text-blue-700">Cleaning Schedule</Link></li>
          <li><Link to="/pages/homeowner/equipment" className="text-blue-500 hover:text-blue-700">Equipment</Link></li>
          <li><Link to="/pages/homeowner/servicerequests" className="text-blue-500 hover:text-blue-700">Service Requests</Link></li>
        </ul>
      </nav>

      {/* Example of useful information */}
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold">Upcoming Maintenance</h2>
          <p>Next scheduled pool cleaning on [Date].</p>
          <p>Next chemical balance check on [Date].</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Recent Service Requests</h2>
          <p>[List of recent service requests or a message indicating there are none]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Tips for Pool Care</h2>
          <ul>
            <li>Check your pool’s pH and chlorine levels at least twice per week.</li>
            <li>Skim debris and clean out baskets at least once per week.</li>
            <li>Keep your pool filter clean and don't overclean it.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default HomeownerDashboard
