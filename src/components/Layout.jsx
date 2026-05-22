import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="layout-root">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
