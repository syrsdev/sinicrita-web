import Field from "./Field";
import Label from "./Label";

const Input = ({ label }: any) => {
    return (
        <>
            <Label label={label} />
            <Field />
        </>
    );
};

export default Input;
