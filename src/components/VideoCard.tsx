import Image from 'next/image';
import Link from 'next/link';
import { HiBadgeCheck, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Video } from '../../types/types';
// import { HiVolumeUp, HiVolumeOff, HiPlay, HiPause, HiBadgeCheck } from "react-icons/hi";

interface IVideoCard {
  video: Video;
}

const VideoCard: React.FC<IVideoCard> = ({ video }) => {
  return (
    <div className="w-full flex justify-center p-10">
      <div className="w-250 lg:w-550 flex flex-col gap-4 bg-white border-2 border-gray-200 rounded-lg p-4">
        <div className="flex justify-between">
          <div className="flex items-start gap-4">
            <Link href={`/${video.postedBy.userName}`}>
              <div className="w-full cursor-pointer flex gap-4">
                <div className="w-11 h-11">
                  <Image
                    src={video.postedBy.image}
                    width="60px"
                    height="60px"
                    layout="responsive"
                    alt={video.postedBy.userName}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-base leading-none font-semibold">
                      {video.postedBy.userName}
                    </p>
                    <HiBadgeCheck className="text-lg text-primary-red" />
                  </div>
                  <span className="text-sm leading-none text-gray-400">
                    @{video.postedBy.userName}
                  </span>
                </div>
              </div>
            </Link>

            <button className="font-bold text-primary-red leading-none cursor-pointer">
              follow
            </button>
          </div>
          <HiOutlineDotsHorizontal className="cursor-pointer" />
        </div>
        <p>{video.caption}</p>
        <video
          src={video.video.asset.url}
          className=""
          autoPlay
          loop
          controls
        ></video>
      </div>
    </div>
  );
};

export default VideoCard;
