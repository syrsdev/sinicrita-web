import { NavLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/input/Index";
import Button from "../components/Button";

const RegisterPage = () => {
    return (
        <AuthLayout>
            <h1 className="font-bold text-[23px] md:text-[28px] xl:text-[40px]">
                Register
            </h1>
            <Input
                label="Username"
                autoFocus={true}
                placeholder="Masukan username"
            ></Input>
            <Input
                label="Password"
                type="password"
                placeholder="Masukan password"
            ></Input>

            <Button type="submit" classname="mt-4">
                Daftar
            </Button>

            <p>
                Sudah punya akun?{" "}
                <NavLink className="underline font-bold" to={"/login"}>
                    Login
                </NavLink>
            </p>
        </AuthLayout>
    );
};

export default RegisterPage;
