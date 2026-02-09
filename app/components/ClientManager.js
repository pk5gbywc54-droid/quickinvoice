'use client';
import { useState, useEffect } from 'react';

export default function ClientManager({ setInvoiceData, setActiveTab }) {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('clients') || '[]');
    setClients(saved);
  }, []);

  const saveClient = () => {
    if (!newClient.name) return;
    
    const updated = [...clients, newClient];
    setClients(updated);
    localStorage.setItem('clients', JSON.stringify(updated));
    setNewClient({ name: '', email: '', address: '' });
  };

  const deleteClient = (index) => {
    const updated = clients.filter((_, i) => i !== index);
    setClients(updated);
    localStorage.setItem('clients', JSON.stringify(updated));
  };

  const useClient = (client) => {
    setInvoiceData(prev => ({
      ...prev,
      clientName: client.name,
      clientEmail: client.email,
      clientAddress: client.address
    }));
    setActiveTab('create');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Client</h2>
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <input
            type="text"
            value={newClient.name}
            onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Client Name"
          />
          <input
            type="email"
            value={newClient.email}
            onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Client Email"
          />
          <textarea
            value={newClient.address}
            onChange={(e) => setNewClient(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows="3"
            placeholder="Client Address"
          />
          <button
            onClick={saveClient}
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition font-medium"
          >
            Save Client
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Saved Clients</h2>
        {clients.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No saved clients yet</p>
        ) : (
          <div className="space-y-3">
            {clients.map((client, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.email}</p>
                  <p className="text-sm text-gray-500 whitespace-pre-line">{client.address}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => useClient(client)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-sm"
                  >
                    Use
                  </button>
                  <button
                    onClick={() => deleteClient(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
