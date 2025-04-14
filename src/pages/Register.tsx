import { NavLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/input/Index";
import Button from "../components/Button";
import Label from "../components/input/Label";
import RadioButton from "../components/input/Radio";
import { useState } from "react";
import { Register } from "../services/auth.service";

const RegisterPage = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Role, setRole] = useState("pendengar");

    const data = { username: Username, password: Password, role: Role };
    console.log(data);

    const handleRegister = (e: any) => {
        e.preventDefault();
        Register(data);
    };
    return (
        <AuthLayout onsubmit={handleRegister}>
            <h1 className="font-bold text-[23px] md:text-[28px] xl:text-[40px] text-center">
                Register
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

            <div className="flex-col">
                <Label label="Role" />
                <div className="flex gap-6">
                    <RadioButton
                        label="Pendengar"
                        name="role"
                        checked={true}
                        onchange={() => setRole("pendengar")}
                    />
                    <RadioButton
                        label="Pencerita"
                        name="role"
                        onchange={() => setRole("pencerita")}
                    />
                </div>
            </div>

            <Button type="submit" classname="mt-4">
                Daftar
            </Button>

            <p className="text-center">
                Sudah punya akun?{" "}
                <NavLink className="underline font-bold" to={"/login"}>
                    Login
                </NavLink>
            </p>
        </AuthLayout>
    );
};

export default RegisterPage;
