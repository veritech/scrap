'use client'

export default function Error({
    error,
    reset
}) {
    return (
        <div>
            Something went wrong
            <div>{error.message}</div>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}