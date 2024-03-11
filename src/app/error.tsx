'use client'

export default function ErrorBoundary({error}: {error: Error}) {
  return (
    <>
      <p>Something went wrong</p>
      <p>Error : {error.message}</p>
    </>
  )
}