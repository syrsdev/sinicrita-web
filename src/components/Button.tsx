const Button = ({ children, type = "button", classname }: any) => {
    return (
        <button
            type={type}
            className={`w-full bg-secondary py-2 px-3 rounded-lg ${classname}`}
        >
            {children}
        </button>
    );
};

export default Button;
