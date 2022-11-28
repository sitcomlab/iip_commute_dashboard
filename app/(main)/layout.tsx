import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">{children}</div>
      <Footer />
    </>
  )
}
