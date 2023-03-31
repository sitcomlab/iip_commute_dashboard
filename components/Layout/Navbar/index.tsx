'use client'

import { Button } from '../../Elements/Button'

import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Title from '@/components/Elements/Title'
import Back from '@/components/Elements/Back'
import { usePathname } from 'next/navigation'
import BaseNavbar from './BaseNavbar'
import { useState } from 'react'
import SectionTitle from '../SectionTitle'

const routeToType: {
  [key: string]: 'climate' | 'mobility' | 'energy' | 'building'
} = {
  klima: 'climate',
  mobilitaet: 'mobility',
  energie: 'energy',
  gebaeude: 'building',
}

export default function Navbar() {
  const pathname = usePathname()

  const [showOverlay, setShowOverlay] = useState(false)

  if (!pathname) {
    return <BaseNavbar></BaseNavbar>
  }

  const isIndexPage = pathname === '/'

  const ActionComponent = isIndexPage ? (
    <Button
      onClick={() => setShowOverlay(true)}
      startIcon={<InformationCircleIcon className="h-[34px]" />}
      variant={'secondary'}
    >
      <Title as="h5">So helfen Daten dem Klima</Title>
    </Button>
  ) : (
    <Back />
  )

  const InfoText = (
    <div className="w-1/3">
      <Title as={'h5'} variant={'inverse'}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis qui
        omnis ad repellat illum hic. Repellendus numquam, sit eos maxime
        voluptatum eaque totam laborum provident beatae minima mollitia
        consequuntur esse?
      </Title>
    </div>
  )

  const OverlayNavbar = (
    <BaseNavbar
      actionComponent={
        <Button
          onClick={() => setShowOverlay(false)}
          startIcon={<XMarkIcon className="h-[34px] text-white" />}
          variant={'secondary'}
        >
          <Title as="h5" variant={'inverse'}>
            Informationen ausblenden
          </Title>
        </Button>
      }
      variant="overlay"
    >
      {InfoText}
    </BaseNavbar>
  )

  if (isIndexPage) {
    return (
      <div className="relative">
        <BaseNavbar actionComponent={ActionComponent}>
          <div className="opacity-0">{InfoText}</div>
        </BaseNavbar>
        {showOverlay && (
          <div className="absolute top-0 left-0 z-10 h-full w-full">
            {OverlayNavbar}
          </div>
        )}
      </div>
    )
  }

  const [_, route] = pathname?.split('/')

  if (['klima', 'energie', 'mobilitaet', 'gebaeude'].includes(route)) {
    return (
      <BaseNavbar actionComponent={ActionComponent}>
        <div className="flex">
          <div className="flex-1"></div>
          <div className="flex flex-1 justify-end">
            <SectionTitle large variant={routeToType[route]} />
          </div>
        </div>
      </BaseNavbar>
    )
  }

  return <BaseNavbar actionComponent={ActionComponent}></BaseNavbar>
}
