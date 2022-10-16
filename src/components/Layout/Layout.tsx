interface ILayout {
  children: React.ReactNode;
}

import Navbar from './Navbar';
import Sidebar from './Sidebar/Sidebar';

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="w-full bg-gray-50 min-h-screen h-full">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
