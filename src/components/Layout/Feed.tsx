import { Video } from '../../../types/types';
import NoResult from '../NoResult';
import VideoCard from '../VideoCard';

interface IFeed {
  videos: Video[];
}

const Feed: React.FC<IFeed> = ({ videos }) => {
  return (
    <div className="w-full h-full flex flex-col gap-10">
      {videos.length ? (
        videos.map((video) => <VideoCard key={video._id} video={video} />)
      ) : (
        <NoResult text="No Videos Found" />
      )}
    </div>
  );
};

export default Feed;
