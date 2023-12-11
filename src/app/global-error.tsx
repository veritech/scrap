'use client'

export default function Error({
    // @ts-ignore
    error,
    // @ts-ignore
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