import { Suspense } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { Route, Routes } from 'react-router'
import { LoadingOrError } from '@/components/LoadingOrError'
import Translation from '@/pages/Translation'

function renderError({ error }: FallbackProps) {
  return <LoadingOrError error={error} />
}

export function App() {
  return (
    <ErrorBoundary fallbackRender={renderError}>
      <Suspense fallback={<LoadingOrError />}>
        <Routes>
          <Route element={<Translation />} path='gnohznew' />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
