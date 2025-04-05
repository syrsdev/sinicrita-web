const AuthLayout = ({ children }: any) => {
    return (
        <div className="h-screen flex justify-center items-center bg-white text-white">
            <div className="flex bg-primary p-10 rounded-2xl gap-7 w-1/3 flex-col items-center">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
