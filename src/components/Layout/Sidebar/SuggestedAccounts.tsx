import Image from 'next/image';
import Link from 'next/link';
import { HiBadgeCheck } from 'react-icons/hi';
import { useAllUsers } from '../../../contexts/AllUsersContext';

const SuggestedAccounts: React.FC = () => {
  const users = useAllUsers();
  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold hidden lg:block mb-2">
        Suggested Accounts
      </p>
      <div className="flex flex-col gap-y-6 mt-4">
        {users.map((user, index) => {
          if (index < 3) {
            return (
              <div className="flex items-start gap-4" key={user._id}>
                <Link href={`/profile/${user._id}`}>
                  <div className="w-full cursor-pointer flex gap-4">
                    <div className="w-11 h-11">
                      <Image
                        src={user.image}
                        width="60px"
                        height="60px"
                        layout="responsive"
                        alt={user.name}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-base leading-none font-semibold">
                          {user.name}
                        </p>
                        <HiBadgeCheck className="text-lg text-primary-red" />
                      </div>
                      <span className="text-sm leading-none text-gray-400">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                </Link>

                <button className="font-bold text-primary-red leading-none cursor-pointer">
                  follow
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
