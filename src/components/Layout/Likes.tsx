import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { Like } from '../../../types/types';

interface ILikes {
  likes: Like[];
  handleLike: () => void;
  handleDislike: () => void;
}

const Like = ({ likes, handleLike, handleDislike }: ILikes) => {
  const { data: session } = useSession();
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);

  const filterLikes = likes?.filter((item) => item._ref === session?.user.id);

  useEffect(() => {
    filterLikes?.length > 0
      ? setLikedByCurrentUser(true)
      : setLikedByCurrentUser(false);
  }, [filterLikes, likes]);

  return (
    <div className="flex gap-2">
      {likedByCurrentUser ? (
        <HiHeart
          className="text-2xl cursor-pointer"
          fill="rgb(220 38 38 / 1)"
          onClick={handleDislike}
        />
      ) : (
        <HiOutlineHeart
          className="text-2xl cursor-pointer"
          onClick={handleLike}
        />
      )}

      {likes?.length > 0 ? (
        <span>{likes.length} Likes</span>
      ) : (
        <span>Be the first one to like this post</span>
      )}
    </div>
  );
};

export default Like;
