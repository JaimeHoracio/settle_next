import Link from "next/link";
import FormLogin from "@/app/login/form-login";

export default function LoginPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
                <h1 className="font-semibold text-2xl">Login</h1>
                <FormLogin></FormLogin>
                <p className="text-center">
                    No se ha registrado?
                    <Link
                        className="text-blue-200 mx-2 hover:underline"
                        href="/register">
                        Crear Cuenta
                    </Link>
                </p>
            </div>
        </div>
    );
}
