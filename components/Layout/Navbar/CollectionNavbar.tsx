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
import { Bars3Icon } from '@heroicons/react/24/outline'
import Title from '@/components/Elements/Title'
import { Spacer } from '@/components/Elements/Spacer'

type Props = {
  title: string
  description: string
}

export default function CollectionNavbar({ title, description }: Props) {
  return (
    <div className="pt-8">
      <div className="container mx-auto translate-y-1/2 px-4 md:px-12">
        <Image
          alt="Logo der Stadt Münster"
          className="ml-auto h-12 w-auto"
          src={MSLogo}
        />
      </div>
      <StairStepBackground variant={'secondary'}>
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
          <Spacer size={'xl'} />
          <div className="flex w-full flex-col-reverse gap-2 md:flex-row">
            <Title as={'h5'} className="flex-[2_2_0%]" variant="primary">
              {description}
            </Title>
            <div className="hidden flex-1 md:block" />
            <Title as={'h2'} className="flex-1" variant="secondary">
              {title}
            </Title>
          </div>
        </Container>
      </StairStepBackground>
    </div>
  )
}
