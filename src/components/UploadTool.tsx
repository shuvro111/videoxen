// interface IUpload {
// }

import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiArrowUp, HiTrash } from 'react-icons/hi';
// import axios from 'axios';
// import { client } from '../utils/client';
import { useSession } from 'next-auth/react';

const UploadTool: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center py-10 gap-4">
      <div className="text-center">
        <h4 className="text-2xl font-semibold">Upload Video</h4>
        <p className="text-gray-400">Post a video to your account</p>
      </div>
      <div className="w-full px-10">
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <div className="">
            <div className="flex items-center justify-center rounded border-dashed border-2 border-gray-400 h-60">
              <p>Drag &amp; Drop A Video or &nbsp;</p>{' '}
              <span>
                <button className="text-primary-red font-semibold underline underline-offset-4">
                  Browse
                </button>
              </span>
              <HiTrash />
            </div>
            <button className="flex items-center gap-2 bg-primary-red py-3 px-8 rounded-full text-white font-bold mt-4">
              Upload
              <HiArrowUp />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadTool;
