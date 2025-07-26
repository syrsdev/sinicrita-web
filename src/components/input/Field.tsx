import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Field = ({
  type,
  id,
  autoFocus,
  placeholder,
  name,
  checked,
  onchange,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (type === "password") {
    return (
      <div className="w-full flex bg-white rounded-lg items-center">
        <Tooltip anchorSelect=".showhidepw" place="top" className="z-50">
          {showPassword ? "Sembunyikan" : "Lihat"}
        </Tooltip>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          autoFocus={autoFocus}
          placeholder={placeholder}
          name={name}
          defaultChecked={checked}
          onChange={onchange}
          className="bg-white rounded-lg text-slate-500 py-2 px-3 focus:outline-none focus:shadow-outline w-full"
        />
        <button
          type="button"
          className="px-3"
          onClick={togglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Tooltip id="showhidepw" />
          {showPassword ? (
            <FaEyeSlash className="text-slate-500 showhidepw" />
          ) : (
            <FaEye className="text-slate-500 tooltip showhidepw" />
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
      className="bg-white rounded-lg text-slate-500 py-2 px-3 focus:outline-none focus:shadow-outline"
    />
  );
};

export default Field;
