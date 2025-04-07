import Field from "./Field";
import Label from "./Label";

const RadioButton = ({ label, name, checked = false }: any) => {
    return (
        <div className="flex gap-1">
            <Field type="radio" id={label} name={name} checked={checked} />
            <Label label={label} />
        </div>
    );
};

export default RadioButton;
