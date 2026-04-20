import './App.css'
import { useCallback, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Portfolio from './components/portfolio'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import IntroSlider from './components/IntroSlider'

function App() {
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem('introShown') === 'true'
  )

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('introShown', 'true')
    setIntroDone(true)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={introDone ? <Portfolio /> : <IntroSlider onComplete={handleIntroComplete} />}
        />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route
          path="*"
          element={
            <div style={{ padding: '24px' }}>
              <h2>Page not found</h2>
              <Link to="/">Go Home</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
