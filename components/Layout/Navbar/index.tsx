import Image from 'next/image'
import StairStepBackground from '../StairStepBackground'
import MSLogo from '@/assets/logos/stadtlogo-muenster.png'
import { Button } from '../../Elements/Button'
import MoreDetails from '../../Elements/MoreDetails'
import Link from 'next/link'
import Collapsible from '../../Elements/Collapsible'
import Container from '../Container'
import {
  BicycleIcon,
  BuildingIcon,
  EnergyIcon,
  MuensterIcon,
} from '@/components/Icons'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Title from '@/components/Elements/Title'

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
          <div className="md:hidden">
            <Collapsible
              trigger={
                <div className="w-fit rounded-full border-2 border-primary p-2">
                  <Bars3Icon className="w-5 stroke-2 text-primary" />
                </div>
              }
            >
              <div className="my-4 flex flex-col gap-2">
                <Link href={'/klima'}>
                  <Button
                    startIcon={<MuensterIcon className="h-6 text-primary" />}
                  >
                    Klima in Münster
                  </Button>
                </Link>
                <Link href={'/energie'}>
                  <Button
                    startIcon={<EnergyIcon className="h-6 text-primary" />}
                  >
                    Energien
                  </Button>
                </Link>
                <Link href={'/mobilitaet'}>
                  <Button
                    startIcon={<BicycleIcon className="h-6 text-primary" />}
                  >
                    Mobilität
                  </Button>
                </Link>
                <Link href={'/gebaeude'}>
                  <Button
                    startIcon={<BuildingIcon className="h-6 text-primary" />}
                  >
                    Gebäude
                  </Button>
                </Link>
              </div>
            </Collapsible>
          </div>
          <div className="flex justify-between">
            <div className="flex-1">
              <Link href={'/'}>
                <Title as="h2" variant={'primary'}>
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
            <div className="hidden h-fit flex-wrap gap-2 md:flex">
              <Link href={'/klima'}>
                <Button
                  startIcon={<MuensterIcon className="h-6 text-primary" />}
                >
                  Klima in Münster
                </Button>
              </Link>
              <Link href={'/energie'}>
                <Button startIcon={<EnergyIcon className="h-6 text-primary" />}>
                  Energien
                </Button>
              </Link>
              <Link href={'/mobilitaet'}>
                <Button
                  startIcon={<BicycleIcon className="h-6 text-primary" />}
                >
                  Mobilität
                </Button>
              </Link>
              <Link href={'/gebaeude'}>
                <Button
                  startIcon={<BuildingIcon className="h-6 text-primary" />}
                >
                  Gebäude
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </StairStepBackground>
    </div>
  )
}
