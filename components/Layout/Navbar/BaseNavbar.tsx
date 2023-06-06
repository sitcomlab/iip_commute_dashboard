import Image from 'next/image'
import StairStepBackground from '../StairStepBackground'
import MSLogo from '@/assets/logos/stadtlogo-muenster.png'
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
import LinkComponent, { LinkProps } from './LinkComponent'
import { Spacer } from '@/components/Elements/Spacer'

const links: LinkProps[] = [
  {
    title: 'zu den Klimadaten',
    icon: MuensterIcon,
    link: '/klima',
  },
  {
    title: 'zu den Energiedaten',
    icon: EnergyIcon,
    link: '/energie',
  },
  {
    title: 'zu den Mobilitätsdaten',
    icon: BicycleIcon,
    link: '/mobilitaet',
  },
  {
    title: 'zu den Gebäudedaten',
    icon: BuildingIcon,
    link: '/gebaeude',
  },
]

type BaseNavbarProps = {
  actionComponent?: React.ReactElement
  variant?: 'primary' | 'secondary' | 'overlay'
  children?: React.ReactElement | React.ReactElement[]
}

export default function BaseNavbar({
  actionComponent,
  variant = 'primary',
  children,
}: BaseNavbarProps) {
  return (
    <div className="pt-8">
      <div className="container relative z-10 mx-auto translate-y-1/2 px-4 md:px-12">
        <Image
          alt="Logo der Stadt Münster"
          className="ml-auto h-12 w-auto"
          src={MSLogo}
        />
      </div>
      <StairStepBackground variant={variant}>
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
                {links.map(l => (
                  <LinkComponent key={l.link} {...l} />
                ))}
              </div>
            </Collapsible>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <Link href={'/'}>
              <Title
                as="h2"
                variant={variant === 'overlay' ? 'inverse' : 'primary'}
              >
                Klimadashboard Münster
              </Title>
            </Link>
            <div className="flex items-center justify-between">
              {actionComponent}

              <div className="hidden h-fit flex-wrap gap-2 xl:flex">
                {links.map(l => (
                  <LinkComponent
                    key={l.link}
                    variant={variant === 'overlay' ? 'inverse' : 'primary'}
                    {...l}
                  />
                ))}
              </div>
            </div>
          </div>
          {children && (
            <>
              <Spacer size={'xl'} />
              {children}
            </>
          )}
        </Container>
      </StairStepBackground>
    </div>
  )
}
