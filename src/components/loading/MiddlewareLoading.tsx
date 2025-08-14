import Loading from "./Loading";

const MiddlewareLoading = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-6">
      <img src="/assets/logo-sinicrita.svg" alt="sinicrita" />
      <span className="flex gap-3 text-xl">
        Loading.. <Loading color="text-primary border-t-primary" />
      </span>
    </div>
  );
};

export default MiddlewareLoading;
