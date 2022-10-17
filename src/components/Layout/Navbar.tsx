import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { HiLogout, HiPlus } from 'react-icons/hi';

import Logo from '../../public/tiktik-logo.png';

// interface INavbar {}

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 p-4">
      <Link href="/" passHref>
        <div className="w-[120px] md:w-[150px]">
          <Image
            src={Logo}
            className="cursor-pointer"
            alt="Tiktok"
            layout="responsive"
          />
        </div>
      </Link>

      {!status && <p>loading...</p>}
      {status === 'authenticated' && (
        <div className="flex items-center gap-4">
          <p>{session.user?.name}</p>{' '}
          <Link href="/upload">
            <button className="flex items-center gap-1 border-2 rounded px-2 py-1 text-primary-red border-primary-red lg:hover:bg-primary-red lg:hover:text-white ease-in-out duration-200">
              <HiPlus />
              <span>Upload</span>
            </button>
          </Link>
          <button
            onClick={() => signOut()}
            type="button"
            className="lg:flex lg:items-center lg:py-1 lg:px-2 lg:gap-2 lg:border-2 lg:border-primary-red lg:rounded text-primary-red lg:hover:bg-primary-red lg:hover:text-white ease-in-out duration-200  "
          >
            <HiLogout />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      )}
      {status === 'unauthenticated' && (
        <button
          onClick={() => signIn('google')}
          type="button"
          className="flex items-center py-2 px-4 gap-2 border-2 border-primary-red rounded text-primary-red hover:bg-primary-red hover:text-white ease-out duration-300  "
        >
          <FaGoogle />
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Navbar;
