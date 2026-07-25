import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Education from './pages/Education'
import Skills from './pages/Skills'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-mint-100">
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navbar />
          <main id="main-content" role="main">
            <Routes>
              <Route path="/" element={<><Hero /><About /><Education /><Skills /><Portfolio /><Contact /></>} />
              <Route path="/about" element={<About />} />
              <Route path="/education" element={<Education />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App