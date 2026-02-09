export const metadata = {
  title: 'QuickInvoice - Professional Invoicing Made Simple',
  description: 'Create professional invoices in seconds',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
