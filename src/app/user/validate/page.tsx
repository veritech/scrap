'use client'

import { useSearchParams } from "next/navigation";
import { validateUserToken } from "../actions";
import { useEffect } from "react";

const Validate = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    useEffect(() => {
        if (token) {
            validateUserToken(token);
        }
    }, [token])

    return (
        <>
        {!token && (
            <div>
                <p>Please check your email. and use the link in the mail to validate your account</p>
            </div>
        )}
        {token && (
            <div>
                <p>Thanks for signing up</p>
            </div>
        )}
        </>
    )
}

export default Validate;
