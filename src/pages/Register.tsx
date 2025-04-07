import { NavLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/input/Index";
import Button from "../components/Button";
import Label from "../components/input/Label";
import RadioButton from "../components/input/Radio";

const RegisterPage = () => {
    return (
        <AuthLayout>
            <h1 className="font-bold text-[23px] md:text-[28px] xl:text-[40px] text-center">
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

            <div className="flex-col">
                <Label label="Role" />
                <div className="flex gap-6">
                    <RadioButton label="Pendengar" name="role" checked={true} />
                    <RadioButton label="Pencerita" name="role" />
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
