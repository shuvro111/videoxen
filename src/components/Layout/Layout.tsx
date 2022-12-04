interface ILayout {
  children: React.ReactNode;
}

import Navbar from './Navbar';
import Sidebar from './Sidebar/Sidebar';

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="lg:w-3/5 lg:m-auto flex h-full">
        <Sidebar />
        <main className="w-full min-h-screen h-full">{children}</main>
      </div>
    </>
  );
};

export default Layout;
