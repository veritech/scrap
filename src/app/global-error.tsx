'use client'

const Error = ({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
  }) => {
    return (
        <div>
            Something went wrong
            <div>{error.message}</div>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}

export default Error;
