import { NavLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/input/Index";

const RegisterPage = () => {
    return (
        <AuthLayout>
            <h1 className="font-bold text-[40px]">Register</h1>
            <Input label="Username" autoFocus={true}></Input>
            <Input label="Password" type="password"></Input>
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
