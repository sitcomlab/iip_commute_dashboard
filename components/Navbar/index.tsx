import Image from 'next/image'
import StairStepBackground from '../Elements/StairStepBackground'
import MSLogo from '@/assets/logos/stadtlogo-muenster.png'
import { Button } from '../Elements/Button'
import MoreDetails from '../Elements/MoreDetails'
import Title from '../Elements/Title'
import Link from 'next/link'

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
        <div className="container mx-auto p-12">
          <div className="flex justify-between">
            <div className="">
              <Title size="lg">
                <span>
                  Klimadashboard <br />
                  Münster
                </span>
              </Title>
              <MoreDetails className="mt-4" link="#" />
            </div>
            <div className="flex h-fit space-x-2">
              <Link href={'/klima'}>
                <Button>Klima in Münster</Button>
              </Link>
              <Button>Energien</Button>
              <Button>Mobilität</Button>
              <Button>Gebäude</Button>
            </div>
          </div>
        </div>
      </StairStepBackground>
    </div>
  )
}
