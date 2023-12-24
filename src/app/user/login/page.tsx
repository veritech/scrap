'use client'
import { useSearchParams } from "next/navigation";
import { validateUserAndSendEmail, validateUserToken } from "../actions"
import { useEffect } from "react";

const Login = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect( () => {
        if (token) {
            validateUserToken(token);
        }
    }, [token])

    return (
        <>
            <form action={validateUserAndSendEmail}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input className="block border w-96 p-1" name="email" />
                </div>
                <button className="border p-2 rounded-md bg-slate-600 text-white">Login</button>
            </form>
        </>
    )
}

export default Login;
