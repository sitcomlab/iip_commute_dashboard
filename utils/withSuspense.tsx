import React, { Suspense } from 'react'

const withSuspense = (
  WrappedComponent: () => JSX.Element | Promise<JSX.Element>,
  FallbackComponent: JSX.Element = <p>Loading...</p>,
) =>
  function () {
    return (
      <Suspense fallback={FallbackComponent}>
        {/* @ts-expect-error Server Component */}
        <WrappedComponent />
      </Suspense>
    )
  }

export default withSuspense
