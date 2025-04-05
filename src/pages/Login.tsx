import { NavLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/input/Index";

const LoginPage = () => {
    return (
        <AuthLayout>
            <h1 className="font-bold text-[40px]">Login</h1>
            <Input label="Email"></Input>
            <p>
                Belum punya akun?{" "}
                <NavLink className="underline" to={"/register"}>
                    Register
                </NavLink>
            </p>
        </AuthLayout>
    );
};

export default LoginPage;
