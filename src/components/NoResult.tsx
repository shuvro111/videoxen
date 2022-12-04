const NoResult: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h2 className="w-full h-screen flex justify-center items-center text-3xl font-semibold text-gray-300">
      {text}
    </h2>
  );
};

export default NoResult;
