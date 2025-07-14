import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAlert } from "../../hooks/useAlert";
import { Login } from "../../services/auth.service";
import AuthLayout from "../../layout/AuthLayout";
import Input from "../../components/input/Index";
import Button from "../../components/button/Button";

const LoginPage = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [buttonDisable, setbuttonDisable] = useState(false);

  useAlert();
  const data = { username: Username, password: Password };

  const handleLogin = (e: any) => {
    e.preventDefault();
    Login(data);
    setbuttonDisable(true);

    setTimeout(() => {
      setbuttonDisable(false);
    }, 1000);
  };
  return (
    <AuthLayout onsubmit={handleLogin}>
      <h1 className="font-bold text-[23px] md:text-[28px] xl:text-[40px] text-center">
        Login
      </h1>
      <Input
        label="Username"
        autoFocus={true}
        placeholder="Masukan username anda"
        onchange={(e: any) => setUsername(e.target.value)}
      ></Input>
      <Input
        label="Password"
        type="password"
        placeholder="Password min 8 karakter"
        onchange={(e: any) => setPassword(e.target.value)}
      ></Input>

      <Button type="submit" classname="mt-4" disable={buttonDisable}>
        Masuk
      </Button>
      <p className="text-center">
        Belum punya akun?{" "}
        <NavLink className="underline font-bold" to={"/register"}>
          Register
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
