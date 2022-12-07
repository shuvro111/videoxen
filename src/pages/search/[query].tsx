import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';
import { IUser, Video } from '../../../types/types';
import NoResult from '../../components/NoResult';
import { useAllUsers } from '../../contexts/AllUsersContext';

const SearchResults = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);

  const [videos, setVideos] = useState<Video[]>([]);
  const [activeTab, setActiveTab] = useState('videos');

  const allUsers = useAllUsers();

  const fetchSearchResult = async (query: string) => {
    const response = await axios.get(`/api/search/${query}`);
    return response.data;
  };

  useEffect(() => {
    if (router.query) {
      fetchSearchResult(router.query.query as string)
        .then((res) => {
          setUsers(res.users);
          const filteredAccounts = allUsers?.filter((user: IUser) =>
            user.name.toLowerCase().includes(router.query.query as string)
          );
          setVideos(res.videos);
          setUsers(filteredAccounts);
        })
        .catch();
    }
  }, [allUsers, router.query]);

  return (
    <section className="w-full text-gray-600 body-font">
      <div className="px-5 mx-auto flex flex-col flex-wrap">
        <div className=" mx-auto w-full">
          <div className=" lg:flex-row flex-col sm:flex-row flex-wrap"></div>
          {/* Feed */}
          <div className="flex flex-col items-center w-full">
            {/* Tabs */}
            <div className="flex gap-x-4">
              <h4
                className={`text-lg mt-10 pb-2 cursor-pointer ${
                  activeTab === 'videos'
                    ? 'text-primary-pink border-primary-pink border-b'
                    : 'text-gray-900 border-b'
                }`}
                onClick={() => setActiveTab('videos')}
              >
                Videos
              </h4>
              <h4
                className={`text-lg mt-10 pb-2 border-b cursor-pointer ${
                  activeTab === 'liked'
                    ? 'text-primary-pink border-primary-pink border-b'
                    : 'text-gray-900 border-b'
                }`}
                onClick={() => setActiveTab('liked')}
              >
                Accounts
              </h4>
            </div>

            {activeTab === 'videos' ? (
              videos?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
                  {videos.map((video) => (
                    <Link href={`/video/${video._id}`} key={video._id}>
                      <video
                        src={video.video.asset.url}
                        width="100%"
                        className="aspect-auto h-60 bg-black cursor-pointer"
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <NoResult text={'No Videos Found'} />
              )
            ) : users?.length > 0 ? (
              <div className="flex flex-col gap-y-6 mt-4 w-full">
                {users.map((user) => {
                  return (
                    <div
                      className="flex items-start gap-2 w-full shadow-md shadow-gray-100 p-6 rounded"
                      key={user._id}
                    >
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
                          <div className="hidden lg:block">
                            <div className="flex items-center gap-1">
                              <p className="text-base leading-none font-semibold">
                                {user.name}
                              </p>
                              <HiBadgeCheck className="text-lg text-primary-pink" />
                            </div>
                            <span className="text-sm leading-none text-gray-400">
                              @{user.username}
                            </span>
                          </div>
                        </div>
                      </Link>

                      <button className="font-bold text-primary-pink leading-none cursor-pointer hidden lg:block">
                        follow
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <NoResult text={'No Users Found'} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
