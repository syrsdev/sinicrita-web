const AuthLayout = ({ children }: any) => {
    return (
        <div className="h-screen w-f flex justify-center items-center text-white bg-gradient-to-bl from-primary via-40% via-tertiary to-white">
            <form className="flex bg-primary p-7 md:p-10 rounded-2xl gap-7 w-10/12 md:w-1/2 lg:w-1/3 flex-col">
                {children}
            </form>
        </div>
    );
};

export default AuthLayout;
