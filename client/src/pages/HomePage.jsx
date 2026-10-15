import NavBar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import ToolsSection from '../components/home/ToolsSection'

// A page is just composition: it assembles sections, and owns no styling of its own.
export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <ToolsSection />
      </main>
      <Footer />
    </>
  )
}
