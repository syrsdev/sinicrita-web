const Field = ({ type, id, autoFocus }: any) => {
    return (
        <input
            type={type}
            id={id}
            autoFocus={autoFocus}
            className="bg-white rounded-lg text-[#282828] py-2 px-3 focus:outline-none focus:shadow-outline"
        />
    );
};

export default Field;
