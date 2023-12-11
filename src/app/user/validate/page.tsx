'use client'

import { validateUserToken } from "../actions";
import { useEffect } from "react";

const Validate = (props: { searchParams: { token: string }}) => {
    const { searchParams } = props;
    
    useEffect(() => {
        if (searchParams.token && typeof searchParams.token === 'string') {
            validateUserToken(searchParams.token);
        }
    }, [searchParams])

    return (
        <>
        {!searchParams.token && (
            <div>
                <p>Please check your email. and use the link in the mail to validate your account</p>
            </div>
        )}
        {searchParams.token && (
            <div>
                <p>Thanks for signing up</p>
            </div>
        )}
        </>
    )
}

export default Validate;