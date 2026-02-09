'use client';
import jsPDF from 'jspdf';

export default function InvoicePreview({ invoiceData }) {
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + (item.quantity * item.rate), 
    0
  );
  const taxAmount = subtotal * (invoiceData.tax / 100);
  const total = subtotal + taxAmount;

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(24);
    doc.text('INVOICE', 20, 20);
    
    doc.setFontSize(10);
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 20, 35);
    doc.text(`Date: ${invoiceData.date}`, 20, 42);
    doc.text(`Due Date: ${invoiceData.dueDate}`, 20, 49);
    
    doc.text('BILL TO:', 20, 65);
    doc.text(invoiceData.clientName, 20, 72);
    doc.text(invoiceData.clientEmail, 20, 79);
    const addressLines = invoiceData.clientAddress.split('\n');
    addressLines.forEach((line, i) => {
      doc.text(line, 20, 86 + (i * 7));
    });
    
    let yPos = 110;
    doc.setFontSize(12);
    doc.text('Description', 20, yPos);
    doc.text('Qty', 120, yPos);
    doc.text('Rate', 145, yPos);
    doc.text('Amount', 170, yPos);
    
    yPos += 7;
    doc.setFontSize(10);
    
    invoiceData.items.forEach(item => {
      const amount = item.quantity * item.rate;
      doc.text(item.description, 20, yPos);
      doc.text(item.quantity.toString(), 120, yPos);
      doc.text(`$${item.rate.toFixed(2)}`, 145, yPos);
      doc.text(`$${amount.toFixed(2)}`, 170, yPos);
      yPos += 7;
    });
    
    yPos += 10;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 145, yPos);
    yPos += 7;
    doc.text(`Tax (${invoiceData.tax}%): $${taxAmount.toFixed(2)}`, 145, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.text(`TOTAL: $${total.toFixed(2)}`, 145, yPos);
    
    if (invoiceData.notes) {
      yPos += 20;
      doc.setFontSize(10);
      doc.text('Notes:', 20, yPos);
      yPos += 7;
      const noteLines = doc.splitTextToSize(invoiceData.notes, 170);
      doc.text(noteLines, 20, yPos);
    }
    
    doc.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
        <div className="border-b-2 border-gray-300 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Invoice #:</span> {invoiceData.invoiceNumber || 'N/A'}</p>
            <p><span className="font-medium">Date:</span> {invoiceData.date}</p>
            <p><span className="font-medium">Due Date:</span> {invoiceData.dueDate || 'N/A'}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-2">BILL TO:</h3>
          <div className="text-sm text-gray-600">
            <p className="font-medium">{invoiceData.clientName || 'Client Name'}</p>
            <p>{invoiceData.clientEmail || 'client@email.com'}</p>
            <p className="whitespace-pre-line">{invoiceData.clientAddress || 'Client Address'}</p>
          </div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2 text-sm font-semibold text-gray-700">Description</th>
              <th className="text-right py-2 text-sm font-semibold text-gray-700">Qty</th>
              <th className="text-right py-2 text-sm font-semibold text-gray-700">Rate</th>
              <th className="text-right py-2 text-sm font-semibold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 text-sm text-gray-600">{item.description || 'Service'}</td>
                <td className="py-3 text-sm text-gray-600 text-right">{item.quantity}</td>
                <td className="py-3 text-sm text-gray-600 text-right">${item.rate.toFixed(2)}</td>
                <td className="py-3 text-sm text-gray-600 text-right">
                  ${(item.quantity * item.rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax ({invoiceData.tax}%):</span>
              <span className="font-medium">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t-2 border-gray-300 pt-2">
              <span>TOTAL:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {invoiceData.notes && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Notes:</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.notes}</p>
          </div>
        )}
      </div>

      <button
        onClick={generatePDF}
        className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold text-lg"
      >
        Download PDF Invoice
      </button>
    </div>
  );
}
