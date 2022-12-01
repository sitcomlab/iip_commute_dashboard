import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  )
}
