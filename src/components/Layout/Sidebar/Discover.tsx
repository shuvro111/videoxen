// interface IDiscover {
// }
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../../../utils/constants';
const Discover: React.FC = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    'lg:border-2 transition-all lg:bg-primary-pink lg:text-white lg:border-primary-pink px-3 py-1 rounded lg:rounded-full flex gap-2 justify-center cursor-pointer text-primary-pink';
  const topicStyle =
    'lg:border-2 transition-all hover:border-primary-pink hover:text-primary-pink lg:border-gray-300 px-3 py-1 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold hidden lg:block mb-2">
        Popular Topics
      </p>

      <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
        {topics.map((item, index) => (
          <Link href={`/?topic=${item.name}`} key={index}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <p className="text-lg">{item.icon}</p>
              <span className="text-sm capitalize hidden lg:block">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
