/* eslint-disable @typescript-eslint/no-unused-vars */
// interface IUpload {
// }

import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
// import axios from 'axios';
// import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { HiArrowUp, HiTrash } from 'react-icons/hi';
import { client } from '../utils/client';
import { topics } from '../utils/constants';
import VideoCard from './VideoCard';

const initForm = {
  caption: '',
  topic: topics[0].name,
};

const UploadTool: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();

  const [wrongFileType, setWrongFileType] = useState(false);
  const [formValues, setFormValues] = useState(initForm);
  const [savingPost, setSavingPost] = useState(false);

  interface Event<T = EventTarget> {
    target: T;
  }

  const handleUpload = async ({
    event,
  }: {
    event: Event<HTMLInputElement>;
  }) => {
    const selectedFile = event.target?.files?.[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile?.type as string)) {
      setWrongFileType(false);
      setLoading(true);

      client.assets
        .upload('file', selectedFile as File, {
          contentType: selectedFile?.type,
          filename: selectedFile?.name,
        })
        .then((data: SanityAssetDocument) => {
          setVideoAsset(data);
          setLoading(false);
        })
        .catch();
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formValues.caption && videoAsset?._id && formValues.topic) {
      setSavingPost(true);

      const doc = {
        _type: 'post',
        caption: formValues.caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: session?.user?.id,
        postedBy: {
          _type: 'postedBy',
          _ref: session?.user?.id,
        },
        topic: formValues.topic,
      };

      await axios.post('/api/post', doc).then(() => router.push('/'));
    }
  };

  const handleDiscard = () => {
    client.delete(videoAsset?._id as string).then(() => {
      setSavingPost(false);
      setVideoAsset(undefined);
      setFormValues(initForm);
    });
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center mt-10 ">
      <div className="flex flex-col gap-4 bg-white w-[90%] lg:w-full px-6 py-12 rounded-xl">
        <div className="text-center">
          <h4 className="text-2xl font-semibold">Upload Video</h4>
          <p className="text-gray-400">Post a video to your account</p>
        </div>

        <div className="w-full">
          {loading ? (
            <h2 className="w-full text-center text-3xl font-semibold text-gray-300">
              Loading ...
            </h2>
          ) : (
            <div className=" flex items-center justify-center rounded p-6">
              {!videoAsset ? (
                <div className="w-full border-dashed border-2 border-gray-400 ">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Select video to upload
                        </p>
                      </div>

                      <p className="text-gray-400 text-center mt-4 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className="bg-primary-pink text-center mt-8 rounded text-white text-md font-medium p-2 w-36 outline-none">
                        Select file
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={(e) => handleUpload({ event: e })}
                      className="w-0 h-0"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex flex-col">
                  <VideoCard
                    video={{
                      _id: videoAsset._id,
                      caption: formValues.caption,
                      comments: [],
                      likes: [],
                      postedBy: {
                        _id: session?.user.id as string,
                        name: session?.user?.name as string,
                        image: session?.user?.image as string,
                        username: session?.user.username as string,
                      },
                      userId: session?.user.id as string,
                      video: {
                        asset: {
                          _id: videoAsset._id,
                          url: videoAsset.url,
                        },
                      },
                    }}
                  />

                  <form
                    className="flex flex-col w-full gap-4 mt-4"
                    onSubmit={handlePost}
                  >
                    <div className=" w-full flex gap-4">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="caption"
                          className="text-sm font-semibold ml-1 mb-2"
                        >
                          Caption
                        </label>
                        <input
                          required
                          type="text"
                          className="border-2 border-gray-200 py-2 px-4 rounded-full text-sm outline-none"
                          name="caption"
                          value={formValues.caption}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="category"
                          className="text-sm font-semibold ml-1 mb-2"
                        >
                          Category
                        </label>
                        <select
                          required
                          className="border-2 border-gray-200 py-2 px-4 rounded-full text-sm outline-none"
                          name="topic"
                          value={formValues.topic}
                          onChange={handleChange}
                        >
                          {topics.map(({ name }) => (
                            <option className="" value={name} key={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <button
                        type="button"
                        onClick={handleDiscard}
                        className="flex items-center gap-2 border-2 text-gray-400 border-gray-200 py-2 px-8 rounded-full font-semibold mt-4"
                      >
                        Discard <HiTrash />
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-primary-pink py-2 px-8 rounded-full text-white font-semibold mt-4"
                      >
                        Upload <HiArrowUp />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadTool;
