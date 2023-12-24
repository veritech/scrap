'use client'

import { useEffect } from "react";

const Error = ({ error, reset }: {
    error: Error & { digest?: string }
    reset: () => void
  }) => {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
      }, [error])
     
    return (
        <div>
            <h2>Login failed</h2>
            { error.message }
            <div>
                <button onClick={() => reset()}>Try again</button>
            </div>
        </div>
    )
}

export default Error;
