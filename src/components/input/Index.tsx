import Field from "./Field";
import Label from "./Label";

const Input = ({ label, type = "text", autoFocus = false }: any) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <Label label={label} />
            <Field id={label} type={type} autoFocus={autoFocus} />
        </div>
    );
};

export default Input;
