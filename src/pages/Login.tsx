import { NavLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/input/Index";
import Button from "../components/Button";
import { useState } from "react";
import { Login } from "../services/auth.service";
import { Alert } from "../hooks/useAlert";

const LoginPage = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const data = { username: Username, password: Password };

    const handleLogin = (e: any) => {
        e.preventDefault();
        Login(data);
    };
    return (
        <AuthLayout onsubmit={handleLogin}>
            <h1 className="font-bold text-[23px] md:text-[28px] xl:text-[40px] text-center">
                Login
            </h1>
            <Input
                label="Username"
                autoFocus={true}
                placeholder="Masukan username"
                onchange={(e: any) => setUsername(e.target.value)}
            ></Input>
            <Input
                label="Password"
                type="password"
                placeholder="Masukan password"
                onchange={(e: any) => setPassword(e.target.value)}
            ></Input>

            <Button type="submit" classname="mt-4">
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
