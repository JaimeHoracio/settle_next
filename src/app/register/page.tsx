import { Suspense } from "react";
import FormRegister from "./form-register";

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FormRegister></FormRegister>
        </Suspense>
    );
}
