import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiBadgeCheck, HiX } from 'react-icons/hi';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { Video } from '../../../types/types';
import CommentForm from '../../components/CommentForm';
import Like from '../../components/Layout/Likes';
import { useAllUsers } from '../../contexts/AllUsersContext';
import { BASE_URL } from '../../utils';

const VideoDetails: React.FC<{ post: Video }> = ({ post }) => {
  const [video, setVideo] = useState(post);
  const { data: session } = useSession();
  const router = useRouter();
  const users = useAllUsers();

  const handleClose = () => router.back();

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

  const addComment = async (comment: string) => {
    const response = await axios.put(`/api/post/${video._id}`, {
      userId: session?.user.id,
      comment,
    });
    setVideo((prev) => ({ ...prev, comments: response.data.comments }));
  };

  return (
    <div className="fixed h-full bottom-0 py-20 left-0 w-full bg-black bg-opacity-50 overflow-hidden">
      <div className="relative w-full lg:w-3/4 h-full  mx-auto  bg-white rounded-lg">
        <div className="relative h-full w-full top-0 left-0 flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-1/2 h-max lg:h-full bg-gray-800 flex items-center">
            <video
              src={video.video.asset.url}
              className="cursor-pointer"
              autoPlay
              loop
              controls
              width="100%"
            ></video>
          </div>
          <div className="w-full lg:w-1/2 h-full flex flex-col p-5 lg:p-10  gap-y-4 overflow-scroll">
            <div className=" flex justify-between">
              <div className="flex items-start gap-4">
                <Link href={`/${video.postedBy.name}`}>
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
                        <HiBadgeCheck className="text-lg text-primary-red" />
                      </div>
                      <span className="text-sm leading-none text-gray-400">
                        @{video.postedBy.username}
                      </span>
                    </div>
                  </div>
                </Link>

                <button className="font-bold text-primary-red leading-none cursor-pointer">
                  follow
                </button>
              </div>
              <HiX className="cursor-pointer text-2xl" onClick={handleClose} />
            </div>
            <p>{video.caption}</p>

            <Like
              handleDislike={() => handleLike(false)}
              handleLike={() => handleLike(true)}
              likes={video.likes}
            />

            <div className="h-full flex flex-col gap-y-4 mt-4">
              {video.comments ? (
                video.comments.map((comment) => (
                  <div
                    className="p-4 shadow-sm border border-gray-200 shadow-gray-50 rounded"
                    key={comment._key}
                  >
                    <p className="font-semibold text-sm">
                      {
                        users.filter(
                          (item) =>
                            item._id === comment.postedBy._id ||
                            item._id === comment.postedBy._ref
                        )[0]?.name
                      }
                    </p>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col justify-center items-center h-full gap-4">
                  <HiChatBubbleLeftRight className="text-6xl lg:text-8xl text-gray-200" />
                  <h4 className="text-gray-400">
                    Seems a little bit quite over here
                  </h4>
                </div>
              )}
            </div>
            {session?.user ? <CommentForm onSubmit={addComment} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${context.query.id}`);

  return {
    props: {
      post: data.video,
    },
  };
};
