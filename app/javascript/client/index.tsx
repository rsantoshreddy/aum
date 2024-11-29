import { createRoot } from 'react-dom/client'
import App from './App'

console.log('Index file loading - Version:', Date.now()) // Add timestamp to track reloads

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Version:', Date.now())
    const container = document.getElementById('root')
    if (!container) {
        console.error('Root element not found - Check if HTML includes div#root')
        return
    }
    console.log('Mounting React app to:', container)
    const root = createRoot(container)
    root.render(
        <App />
    )
})