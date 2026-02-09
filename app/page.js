'use client';
import { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import ClientManager from './components/ClientManager';

export default function Home() {
  const [activeTab, setActiveTab] = useState('create');
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    items: [{ description: '', quantity: 1, rate: 0 }],
    notes: '',
    tax: 0
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-indigo-600">QuickInvoice</h1>
          <p className="text-gray-600 text-sm">Professional invoices in seconds</p>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('create')}
                className={`py-4 px-8 font-medium text-sm ${
                  activeTab === 'create'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Create Invoice
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`py-4 px-8 font-medium text-sm ${
                  activeTab === 'clients'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Clients
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'create' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InvoiceForm 
                  invoiceData={invoiceData} 
                  setInvoiceData={setInvoiceData} 
                />
                <InvoicePreview invoiceData={invoiceData} />
              </div>
            ) : (
              <ClientManager setInvoiceData={setInvoiceData} setActiveTab={setActiveTab} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
