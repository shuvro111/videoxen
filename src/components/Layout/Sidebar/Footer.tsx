// interface IFooter {
// }

import {
  footerList1,
  footerList2,
  footerList3,
} from '../../../utils/constants';

const List: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start">
      {items.map((item, index) => (
        <span
          className="mr-3 last:mr-0 text-sm text-gray-400 leading-relaxed transition-all hover:underline hover:underline-offset-4 cursor-pointer "
          key={index}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col gap-4">
      <List items={footerList1} />
      <List items={footerList2} />
      <List items={footerList3} />
    </div>
  );
};

export default Footer;
