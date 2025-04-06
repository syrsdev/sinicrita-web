import { NavLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/input/Index";

const LoginPage = () => {
    return (
        <AuthLayout>
            <h1 className="font-bold text-[40px]">Login</h1>
            <Input label="Username" autoFocus={true}></Input>
            <Input label="Password" type="password"></Input>
            <p>
                Belum punya akun?{" "}
                <NavLink className="underline font-bold" to={"/register"}>
                    Register
                </NavLink>
            </p>
        </AuthLayout>
    );
};

export default LoginPage;
