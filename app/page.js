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
