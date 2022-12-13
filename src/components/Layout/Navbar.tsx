import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { HiLogout, HiOutlineSearch, HiPlus } from 'react-icons/hi';

import Logo from '../../public/videoxen-logo.png';

// interface INavbar {}

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const [query, setQuery] = useState('');
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleSearch = () => {
    router.push(`/search/${query}`);
  };

  return (
    <div className="lg:w-3/5 lg:m-auto flex justify-between items-center border-b-2 border-gray-200 py-4">
      <Link href="/" passHref>
        <div className="w-[120px] md:w-[150px] text">
          <Image
            src={Logo}
            className="cursor-pointer text-primary-pink"
            alt="Videoxen"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="hidden lg:flex lg:items-center py-2 px-4 border-2 border-gray-200 rounded-full">
        <input
          type="text"
          className="w-full outline-none placeholder:text-gray-400 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <HiOutlineSearch
          className="text-gray-400 cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      {!status && <p>loading...</p>}
      {status === 'authenticated' && (
        <div className="flex items-center gap-4">
          <Link href={`/${session.user?.name}`}>
            <div className="w-10 h-10 cursor-pointer">
              <Image
                src={session.user?.image as string}
                width={30}
                height={30}
                layout="responsive"
                alt={session.user?.name as string}
                className="rounded-full"
              />
            </div>
          </Link>{' '}
          <Link href="/upload">
            <button className="flex items-center gap-1 border-2 rounded-full px-4 py-1 text-primary-pink border-primary-pink lg:hover:bg-primary-pink lg:hover:text-white ease-in-out duration-200">
              <HiPlus />
              <span>Upload</span>
            </button>
          </Link>
          <button
            onClick={() => signOut()}
            type="button"
            className="lg:flex lg:items-center lg:py-1 lg:px-4 lg:gap-2 lg:border-2 lg:border-primary-pink lg:rounded-full text-primary-pink lg:hover:bg-primary-pink lg:hover:text-white ease-in-out duration-200  "
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
          className="flex items-center py-2 px-4 gap-2 border-2 border-primary-pink rounded text-primary-pink hover:bg-primary-pink hover:text-white ease-out duration-300  "
        >
          <FaGoogle />
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Navbar;
