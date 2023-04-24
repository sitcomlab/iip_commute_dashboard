'use client'

import { Button } from '../../Elements/Button'

import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Title from '@/components/Elements/Title'
import Back from '@/components/Elements/Back'
import { usePathname } from 'next/navigation'
import BaseNavbar from './BaseNavbar'
import { useState } from 'react'
import SectionTitle from '../SectionTitle'
import { AnimatePresence, motion } from 'framer-motion'

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
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute left-0 top-0 z-10 h-full w-full"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              {OverlayNavbar}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const [_, route] = pathname?.split('/')

  if (['klima', 'energie', 'mobilitaet', 'gebaeude'].includes(route)) {
    const sectionText: Record<string, string> = {
      klima:
        'Schon jetzt sind die Auswirkungen der Klimakrise in Münster nicht nur spür- sondern auch messbar. Münster will klimaneutral und klimaangepasst werden und ihrer Verantwortung für ein „gutes Morgen“ gerecht werden. Dafür braucht es die gesamte Stadtgesellschaft!',
      energie:
        'Egal ob Zuhause, im Unternehmen oder als Kommune, diese Grundsätze liegen einer erfolgreichen Energiewende zugrunde: Die Vermeidung von Energieverbrauch hat oberste Priorität. Der nicht-vermeidbare Energiebedarf wird mit effizienter Technik verringert. Der dann noch verbleibende Energiebedarf wird durch erneuerbare Energieträger gedeckt.',
      mobilitaet:
        'Das Ziel einer funktionierenden, klimafreundlichen Mobilität stellt eine wachsende Stadt wie Münster vor eine große Herausforderung. Wenn die gesamte Stadtgesellschaft bereit ist, neue Wege zu gehen, kann sie gemeistert werden.',
      gebaeude:
        'Für das Ziel einer klimaneutralen und klimaangepassten Stadt kann die Rolle von Gebäuden kaum überschätzt werden. Nicht nur das Einsparpotential von CO2 ist in diesem Bereich besonders hoch. Auch können Gebäudeeigentümer:innen durch gezielte Maßnahmen Energiekosten sparen und ihr Gebäude vor Extremwetter schützen.',
    }

    return (
      <BaseNavbar actionComponent={ActionComponent}>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
          <div className="flex-1">
            <Title as="h5" variant="primary">
              {sectionText[route]}
            </Title>
          </div>
          <div className="flex flex-1 justify-end">
            <SectionTitle large variant={routeToType[route]} />
          </div>
        </div>
      </BaseNavbar>
    )
  }

  return <BaseNavbar actionComponent={ActionComponent}></BaseNavbar>
}
