import React, { useState } from 'react';

// Sample data for integrations
const integrationData = [
  {
    id: 1,
    name: 'Google Calendar',
    connected: true,
    lastSync: '2023-09-15 10:45 AM',
    syncFrequency: 'Every Hour',
  },
  {
    id: 2,
    name: 'ResearchGate',
    connected: false,
    lastSync: 'Not Connected',
    syncFrequency: 'N/A',
  },
  {
    id: 3,
    name: 'Moodle LMS',
    connected: true,
    lastSync: '2023-09-14 02:00 PM',
    syncFrequency: 'Daily',
  },
  {
    id: 4,
    name: 'ORCID',
    connected: true,
    lastSync: '2023-09-10 05:30 PM',
    syncFrequency: 'Weekly',
  },
];

// Component to display connection status
const IntegrationStatus = ({ connected }) => (
  <span
    className={`px-2 py-1 rounded-full text-sm font-bold ${
      connected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
    }`}
  >
    {connected ? 'Connected' : 'Disconnected'}
  </span>
);

const IntegrationToolsPage = () => {
  const [integrations, setIntegrations] = useState(integrationData);

  // Function to toggle connection status (for demo purposes)
  const toggleConnection = (id) => {
    const updatedIntegrations = integrations.map((integration) =>
      integration.id === id
        ? { ...integration, connected: !integration.connected, lastSync: 'Not Connected', syncFrequency: 'N/A' }
        : integration
    );
    setIntegrations(updatedIntegrations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">

          {/* Header */}
          <h2 className="text-3xl font-bold mb-6 text-center">Integration Tools</h2>

          {/* Integration Tools Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {integrations.map((integration) => (
              <div key={integration.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{integration.name}</h3>
                  <IntegrationStatus connected={integration.connected} />
                </div>
                <p className="text-sm">Last Sync: {integration.lastSync}</p>
                <p className="text-sm">Sync Frequency: {integration.syncFrequency}</p>
                <div className="mt-4">
                  {integration.connected ? (
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg"
                      onClick={() => toggleConnection(integration.id)}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded-lg"
                      onClick={() => toggleConnection(integration.id)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* OAuth and API Key Setup Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">API Keys & Authorization</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="mb-2">To connect with external services, you may need to enter API keys or authorize access via OAuth.</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Setup OAuth</button>
              <button className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-lg">Enter API Key</button>
            </div>
          </div>

          {/* Import/Export Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Data Import & Export</h3>
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p>Import research publications, class attendance, or other data from external sources.</p>
              </div>
              <div className="flex">
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2">Import Data</button>
                <button className="bg-gray-500 text-white py-2 px-4 rounded-lg">Export Data</button>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Recent Sync Activities</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <ul className="list-disc list-inside">
                <li>Google Calendar synced on 2023-09-15 at 10:45 AM</li>
                <li>ORCID synced on 2023-09-10 at 05:30 PM</li>
                <li>ResearchGate disconnected on 2023-09-12</li>
                <li>Moodle LMS synced on 2023-09-14 at 02:00 PM</li>
              </ul>
            </div>
          </div>

          {/* Documentation and Help */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Documentation & Help</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="mb-2">Need help with connecting or configuring integrations?</p>
              <a href="#" className="text-blue-500 underline">
                View Documentation
              </a>
              <a href="#" className="ml-4 text-blue-500 underline">
                Troubleshoot Sync Issues
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IntegrationToolsPage;
