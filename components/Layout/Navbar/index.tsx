import Image from 'next/image'
import StairStepBackground from '../StairStepBackground'
import MSLogo from '@/assets/logos/stadtlogo-muenster.png'
import { Button } from '../../Elements/Button'
import MoreDetails from '../../Elements/MoreDetails'
import Title from '../../Elements/Title'
import Link from 'next/link'
import Collapsible from '../../Elements/Collapsible'
import Container from '../Container'

export default function Navbar() {
  return (
    <div className="pt-8">
      <div className="translate-y-4 px-8">
        <Image
          alt="Logo der Stadt Münster"
          className="ml-auto h-12 w-auto"
          src={MSLogo}
        />
      </div>
      <StairStepBackground>
        <Container>
          <div className="flex justify-between">
            <div className="flex-1">
              <Link href={'/'}>
                <Title size="lg">
                  <span>
                    Klimadashboard <br />
                    Münster
                  </span>
                </Title>
              </Link>
              <Collapsible trigger={<MoreDetails className="mt-4" />}>
                <div>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Reiciendis, cupiditate! Tempora cum maiores soluta rem enim
                  beatae, quis illum, sunt, quaerat minima nemo odit.
                  Consequatur harum laboriosam doloremque impedit sed.
                </div>
              </Collapsible>
            </div>
            <div className="flex h-fit flex-wrap space-x-2">
              <Link href={'/klima'}>
                <Button>Klima in Münster</Button>
              </Link>
              <Button>Energien</Button>
              <Link href={'/mobilitaet'}>
                <Button>Mobilität</Button>
              </Link>
              <Button>Gebäude</Button>
            </div>
          </div>
        </Container>
      </StairStepBackground>
    </div>
  )
}
