import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiBadgeCheck, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { Video } from '../../types/types';
import Likes from './Layout/Likes';
// import { HiVolumeUp, HiVolumeOff, HiPlay, HiPause, HiBadgeCheck } from "react-icons/hi";

interface IVideoCard {
  video: Video;
}

const VideoCard: React.FC<IVideoCard> = ({ video: _video }) => {
  const [video, setVideo] = useState(_video);
  const { data: session } = useSession();
  const router = useRouter();

  const handleLike = async (like: boolean) => {
    if (!session?.user) {
      router.push('/login');
    } else {
      const res = await axios.put(`/api/post/like`, {
        postId: video._id,
        userId: session?.user.id,
        like,
      });

      setVideo((prev) => ({ ...prev, likes: res.data.video.likes }));
    }
  };

  return (
    <div
      className="w-full flex justify-end"
      // onClick={() => router.push(`/video/${video._id}`)}
    >
      <div className="w-250 lg:w-550 flex flex-col gap-4 bg-white border-2 border-gray-200 rounded-lg p-4">
        <div className="flex justify-between">
          <div className="flex items-start gap-4">
            <Link href={`/${video.postedBy._id}`}>
              <div className="w-full cursor-pointer flex gap-4">
                <div className="w-11 h-11">
                  <Image
                    src={video.postedBy.image}
                    width="60px"
                    height="60px"
                    layout="responsive"
                    alt={video.postedBy.name}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-base leading-none font-semibold">
                      {video.postedBy.name}
                    </p>
                    <HiBadgeCheck className="text-lg text-primary-pink" />
                  </div>
                  <span className="text-sm leading-none text-gray-400">
                    @{video.postedBy.username}
                  </span>
                </div>
              </div>
            </Link>

            <button className="font-bold text-primary-pink leading-none cursor-pointer">
              follow
            </button>
          </div>
          <HiOutlineDotsHorizontal className="cursor-pointer" />
        </div>
        <p>{video.caption}</p>
        <Link href={`/video/${video._id}`}>
          <video
            src={video.video.asset.url}
            className="cursor-pointer"
            autoPlay
            loop
            controls
          ></video>
        </Link>
        <div className="flex gap-x-8">
          <Likes
            likes={video.likes}
            handleLike={() => handleLike(true)}
            handleDislike={() => handleLike(false)}
          />
          <div className="flex items-center gap-2">
            <HiChatBubbleLeftRight className="text-xl text-gray-900" />

            <span>{video?.comments?.length || 'No'} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
