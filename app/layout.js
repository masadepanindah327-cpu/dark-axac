-- app/layout.js --
import './globals.css'

export const metadata = {
  title: 'Dark Axac | Absolute Core',
  description: 'Unrestricted AI Interface',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

-- app/page.js --
import Sidebar from '../components/Sidebar';
import ChatUI from '../components/ChatUI';

export default function Home() {
  return (
    <main className="h-screen w-screen flex bg-axac-bg">
      <Sidebar />
      <ChatUI />
    </main>
  );
}

