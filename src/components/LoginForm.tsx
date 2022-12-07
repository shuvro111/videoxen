import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaGoogle } from 'react-icons/fa';

const LoginhtmlForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn('google');
  };

  if (session?.user) {
    router.push('/');
  }

  return (
    <div className="w-2/3 flex justify-center mx-auto">
      <div className=" bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        <h2 className="text-gray-900 text-3xl mb-1 font-semibold my-4">
          Login
        </h2>
        <p className="leading-relaxed my-5 text-gray-600">
          Please login to Invideo to follow other connect with other people and
          interact.
        </p>

        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <button
          className="text-white bg-primary-pink border-0 py-2 px-6 focus:outline-none hover:bg-primary-pink rounded text-lg"
          onClick={handleSignIn}
        >
          Sign In
        </button>

        <span className="my-4 text-center text-md">Or</span>

        <button
          onClick={handleSignIn}
          type="button"
          className="flex justify-center items-center py-2 px-4 gap-2 border-2 border-primary-pink rounded text-primary-pink hover:bg-primary-pink hover:text-white ease-out duration-300  "
        >
          <FaGoogle />
          Sign in with Google
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          By signining up you accept the terms and conditions of Invideo
        </p>
      </div>
    </div>
  );
};

export default LoginhtmlForm;
