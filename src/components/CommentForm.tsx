import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { HiPaperAirplane } from 'react-icons/hi2';

const CommentForm = ({
  onSubmit,
}: {
  onSubmit: (comment: string) => Promise<void>;
}) => {
  const [commntText, setCommntText] = useState('');
  const { data: session } = useSession();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(commntText);
  };

  return (
    <div className="flex gap-x-2 items-center">
      <div className="w-11 h-11">
        <Image
          src={session?.user.image as string}
          width={30}
          height={30}
          layout="responsive"
          alt={session?.user.name}
          className="rounded-full"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-between items-center gap-x-2"
      >
        <input
          required
          type="text"
          placeholder="write your comment"
          value={commntText}
          onChange={(e) => setCommntText(e.target.value)}
          className="w-full border-2 border-gray-200 py-2 px-4 rounded-full text-sm outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-x-2 bg-primary-pink py-2 px-4 rounded-full text-white text-sm font-semibold"
        >
          <span className="hidden lg:block">Submit</span>
          <HiPaperAirplane />
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
