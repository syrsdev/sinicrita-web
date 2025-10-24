import Field from "./Field";
import Label from "./Label";

const Input = ({
  label,
  type = "text",
  autoFocus = false,
  placeholder,
  onchange,
  onkeydown,
  bgColor,
}: any) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <Label label={label} />}
      <Field
        id={label}
        type={type}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onchange={onchange}
        onkeydown={onkeydown}
        bgColor={bgColor}
      />
    </div>
  );
};

export default Input;
