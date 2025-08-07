const Loading = ({ color = "text-white border-t-white" }) => {
  return (
    <div className="flex-col gap-4 flex items-center justify-center w-min">
      <div
        className={`w-6 h-6 border-4 border-transparent ${color} text-4xl animate-spin flex items-center justify-center rounded-full`}
      ></div>
    </div>
  );
};

export default Loading;
