const AuthLayout = ({ children }: any) => {
    return (
        <div className="h-screen flex justify-center items-center bg-white text-white">
            <form className="flex bg-primary p-7 md:p-10 rounded-2xl gap-7 w-10/12 md:w-1/2 lg:w-1/3 flex-col items-center">
                {children}
            </form>
        </div>
    );
};

export default AuthLayout;
