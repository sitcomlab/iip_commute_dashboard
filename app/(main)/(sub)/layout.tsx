import Back from '@/components/Elements/Back'
import { Spacer } from '@/components/Elements/Spacer'
import AnimatedPage from '@/components/Layout/AnimatedPage'
import Container from '@/components/Layout/Container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Back />
      <Spacer />
      <AnimatedPage>{children}</AnimatedPage>
    </Container>
  )
}
