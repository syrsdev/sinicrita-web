const Field = ({ type, id, autoFocus, placeholder }: any) => {
    return (
        <input
            type={type}
            id={id}
            autoFocus={autoFocus}
            placeholder={placeholder}
            className="bg-white rounded-lg text-[#282828] py-2 px-3 focus:outline-none focus:shadow-outline"
        />
    );
};

export default Field;
