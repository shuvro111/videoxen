// interface ISidebar {}
import Link from 'next/link';
import { useState } from 'react';
import { HiHome, HiMenu, HiX } from 'react-icons/hi';
import Discover from './Discover';
import Footer from './Footer';
import SuggestedAccounts from './SuggestedAccounts';

const Sidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const activeStyles =
    'w-full flex gap-2 items-center justify-center lg:justify-start my-3 cursor-pointer font-semibold hover:text-primary-red text-primary-red';

  return (
    <div className="w-14 lg:w-8/12 lg:pr-6 flex lg:justify-between">
      {/* menu toggle button  */}
      <div
        className="lg:hidden flex justify-center mt-2 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <HiX /> : <HiMenu />}
      </div>

      {/* sidebar  */}
      {showSidebar && (
        <div className="flex flex-col lg:gap-2 items-center lg:items-start ">
          <Link href="/?topic=for-you">
            <div className={activeStyles}>
              <p className=" text-2xl">
                <HiHome />
              </p>
              <span className="text-lg hidden lg:block">For You</span>
            </div>
          </Link>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
