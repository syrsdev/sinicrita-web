import Loading from "./Loading";

const Button = ({
    children,
    type = "button",
    classname,
    disable,
    onclick,
}: any) => {
    return (
        <button
            type={type}
            disabled={disable}
            onClick={onclick}
            className={`w-full gap-2 flex justify-center items-center bg-secondary py-2 px-3 rounded-lg cursor-pointer ${classname}`}
        >
            {disable ? <Loading /> : children}
        </button>
    );
};

export default Button;
