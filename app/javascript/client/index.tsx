import React from "react"
import { createRoot } from 'react-dom/client'

const App = React.lazy(() => import('./App'))

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root')
    if (!container) {
        console.error('Root element not found')
        return
    }
    const root = createRoot(container)
    root.render(
        <React.Suspense fallback={<div>Loading...</div>}>
            <App />
        </React.Suspense>
    )
})