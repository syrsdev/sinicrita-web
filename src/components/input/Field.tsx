import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Field = ({
  type,
  id,
  autoFocus,
  placeholder,
  name,
  checked,
  onchange,
  onkeydown,
  bgColor = "bg-white",
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (type === "password") {
    return (
      <div className={`w-full flex ${bgColor} rounded-lg items-center`}>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          autoFocus={autoFocus}
          placeholder={placeholder}
          name={name}
          defaultChecked={checked}
          onChange={onchange}
          onKeyDown={onkeydown}
          className={`${bgColor} rounded-lg text-slate-500 py-2 px-3 focus:outline-none focus:shadow-outline w-full`}
        />
        <button
          type="button"
          onClick={togglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
          data-tooltip-id="showhidepw"
          data-tooltip-content={showPassword ? "Sembunyikan" : "Lihat"}
          className="px-3"
        >
          {showPassword ? (
            <FaEyeSlash className="text-slate-500" />
          ) : (
            <FaEye className="text-slate-500" />
          )}
        </button>
      </div>
    );
  }

  return (
    <input
      type={type}
      id={id}
      autoFocus={autoFocus}
      placeholder={placeholder}
      name={name}
      defaultChecked={checked}
      onChange={onchange}
      onKeyDown={onkeydown}
      className={`${bgColor} rounded-lg text-slate-500 py-2 px-3 focus:outline-none focus:shadow-outline`}
    />
  );
};

export default Field;
