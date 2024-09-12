const LoadingButton = () => {
  return (
    <div className="flex space-x-1 justify-center items-center h-6 pt-1">
      <span className="sr-only">Loading...</span>
      <div className="h-[0.4rem] w-[0.4rem] bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-[0.4rem] w-[0.4rem] bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-[0.4rem] w-[0.4rem] bg-white rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingButton;
