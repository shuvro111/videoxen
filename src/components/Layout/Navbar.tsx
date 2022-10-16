import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../public/tiktik-logo.png';

// interface INavbar {}

const Navbar: React.FC = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
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
    </div>
  );
};

export default Navbar;
