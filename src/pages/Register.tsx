import { NavLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";

const RegisterPage = () => {
    return (
        <AuthLayout>
            <h1 className="font-bold text-[40px]">Register</h1>
            <p>
                Sudah punya akun?{" "}
                <NavLink className="underline" to={"/login"}>
                    Login
                </NavLink>
            </p>
        </AuthLayout>
    );
};

export default RegisterPage;
