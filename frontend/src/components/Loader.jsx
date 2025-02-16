import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <FaSpinner className="animate-spin text-blue-500 text-4xl" />
    </div>
  );
};

export default Loader;
