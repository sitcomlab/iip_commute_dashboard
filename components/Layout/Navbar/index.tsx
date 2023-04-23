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
    <div className="lg:w-2/3 2xl:w-1/3">
      <Title as={'h5'} variant={'inverse'}>
        Wo steht die Stadt Münster auf ihrem Weg zur Klimaneutralität? Wie
        erkennen wir Fortschritte im kommunalen Klimaschutz und worin genau
        zeigen sich die Folgen des Klimawandels, die wir schon jetzt in Münster
        spüren? Antworten auf diese Fragen zu finden, ist wichtig, denn sie
        können die Basis bilden, auf deren Grundlage wichtige Weichenstellungen
        im Klimaschutz und in der Klimafolgenanpassung entschieden werden. Das
        Klimadashboard zeigt den aktuellen Datenstand zu verschiedenen
        Indikatoren im Klimaschutz in der Klimaanpassung und schafft so einen
        Beitrag für mehr Transparenz in der gesamtstädtischen Klimaarbeit.
        Manche Daten, die für obenstehenden Fragen spannend sind, stehen heute
        noch nicht zu Verfügung. Dies kann sich jedoch ändern und so wird das
        Klimadashboard wachsen und sich weiterentwickeln. Entwickelt wurde das
        Klimadashboard von Smart City und der Stabstelle Klima der Stadt Münster
        in Zusammenarbeit mit den Stadtwerken Münster und der
        Wirtschaftsförderung Münster.
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
          <div className="h-40" />
        </BaseNavbar>
        {showOverlay && (
          <div className="absolute left-0 top-0 z-10 h-full w-full">
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
