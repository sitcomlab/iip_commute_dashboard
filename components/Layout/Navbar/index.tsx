import Image from 'next/image'
import StairStepBackground from '../StairStepBackground'
import MSLogo from '@/assets/logos/stadtlogo-muenster.png'
import { Button } from '../../Elements/Button'
import Link from 'next/link'
import Collapsible from '../../Elements/Collapsible'
import Container from '../Container'
import {
  BicycleIcon,
  BuildingIcon,
  EnergyIcon,
  MuensterIcon,
} from '@/components/Icons'
import { Bars3Icon, InformationCircleIcon } from '@heroicons/react/24/outline'
import Title from '@/components/Elements/Title'

export default function Navbar() {
  return (
    <div className="pt-8">
      <div className="container mx-auto translate-y-1/2 px-4 md:px-12">
        <Image
          alt="Logo der Stadt Münster"
          className="ml-auto h-12 w-auto"
          src={MSLogo}
        />
      </div>
      <StairStepBackground>
        <Container>
          <div className="xl:hidden">
            <Collapsible
              trigger={
                <div className="w-fit rounded-full border-2 border-primary p-2">
                  <Bars3Icon className="w-5 stroke-2 text-primary" />
                </div>
              }
            >
              <div className="my-4 flex flex-col gap-2 md:flex-row">
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
          <div className="flex flex-col justify-between gap-4">
            <Link href={'/'}>
              <Title as="h2" variant={'primary'}>
                Klimadashboard Münster
              </Title>
            </Link>
            <div className="flex items-center justify-between">
              <Collapsible
                trigger={
                  <Button
                    startIcon={<InformationCircleIcon className="h-[34px]" />}
                    variant={'secondary'}
                  >
                    <Title as="h5">So helfen Daten dem Klima</Title>
                  </Button>
                }
              >
                <div>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Reiciendis, cupiditate! Tempora cum maiores soluta rem enim
                  beatae, quis illum, sunt, quaerat minima nemo odit.
                  Consequatur harum laboriosam doloremque impedit sed.
                </div>
              </Collapsible>

              <div className="hidden h-fit flex-wrap gap-2 xl:flex">
                <Link href={'/klima'}>
                  <Button
                    startIcon={
                      <MuensterIcon className="h-[34px] text-primary" />
                    }
                  >
                    <Title as="h5">Klima in Münster</Title>
                  </Button>
                </Link>
                <Link href={'/energie'}>
                  <Button
                    startIcon={<EnergyIcon className="h-[34px] text-primary" />}
                  >
                    <Title as="h5">Energien</Title>
                  </Button>
                </Link>
                <Link href={'/mobilitaet'}>
                  <Button
                    startIcon={
                      <BicycleIcon className="h-[34px] text-primary" />
                    }
                  >
                    <Title as="h5">Mobilität</Title>
                  </Button>
                </Link>
                <Link href={'/gebaeude'}>
                  <Button
                    startIcon={
                      <BuildingIcon className="h-[34px] text-primary" />
                    }
                  >
                    <Title as="h5">Gebäude</Title>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </StairStepBackground>
    </div>
  )
}
