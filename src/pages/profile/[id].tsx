import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';
import { IUser, Video } from '../../../types/types';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser>({
    _id: '',
    _type: 'user',
    image: '',
    name: '',
    username: '',
  });

  const [videos, setVideos] = useState<Video[]>([]);

  const fetchAllVideos = async () => {
    const { data } = await axios.get('http://localhost:3000/api/post');
    return data.videos;
  };

  const fetchSingleUser = async (id: string) => {
    const response = await axios.get(`/api/users/${id}`);
    return response.data.user[0];
  };

  useEffect(() => {
    if (router.query) {
      fetchSingleUser(router.query.id as string)
        .then((user) => setUser(user))
        .catch();
    }

    fetchAllVideos()
      .then((videos) => setVideos(videos))
      .catch();
  }, [router.query]);

  return (
    <section className="w-full text-gray-600 body-font">
      <div className="px-5 mx-auto flex flex-col">
        <div className=" mx-auto">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                {/* <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg> */}
                <Image
                  src={user?.image}
                  width={150}
                  height={150}
                  className="rounded-full"
                  alt={user?.name}
                />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg flex items-center gap-x-1">
                  {user?.name}
                  <HiBadgeCheck className="text-lg text-primary-red" />
                </h2>
                <span className="text-sm leading-none text-gray-400">
                  @{user.username}
                </span>
                <div className="w-12 h-1 bg-primary-red rounded mt-2 mb-4"></div>
                <button
                  className="text-white bg-primary-red border-0 py-2 px-6 focus:outline-none hover:bg-primary-red rounded-full text-sm"
                  // onClick={() => {}}
                >
                  Follow
                </button>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="text-primary-red inline-flex items-center">
                Biography
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </p>

              <p className="leading-relaxed text-lg mt-4">
                Meggings portland fingerstache lyft, post-ironic fixie man bun
                banh mi umami everyday carry hexagon locavore direct trade art
                party. Locavore small batch listicle gastropub farm-to-table
                lumbersexual salvia messenger bag.
              </p>
            </div>
          </div>
          {/* Feed */}
          <div className="flex flex-col items-center w-full ml-20">
            <h4 className="text-2xl font-semibold mt-10 pb-2 border-b">Feed</h4>
            <div className="grid grid-cols-3 gap-4 mt-10">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
