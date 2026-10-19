import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// nginx на хостинге отдаёт /projects/x/index.html и редиректит на /projects/x/ —
// убираем хвостовой слеш, т.к. маршруты в App сравниваются по точному пути
const { pathname, search, hash } = window.location;
if (pathname.length > 1 && pathname.endsWith('/')) {
  window.history.replaceState(null, '', pathname.replace(/\/+$/, '') + search + hash);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
