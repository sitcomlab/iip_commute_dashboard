import Link from 'next/link'
import * as React from 'react'

import { Button } from './Button'

interface ButtonProps {
  type: 'climate' | 'mobility' | 'energy' | 'building' | 'münster' | 'osnabrück' | 'lübeck'
}

export function GoToButton({ type }: ButtonProps): JSX.Element {
  if (type === 'mobility') {
    return (
      <Link href={'/mobilitaet'}>
        <Button variant={'goToMobility'}>zu den Mobilitätsdaten</Button>
      </Link>
    )
  }



  if (type === 'münster') {
    return (
      <Link href={'/muenster'}>
        <Button variant={'goToMuenster'}>zu dem Münster-Dashboard</Button>
      </Link>
    )
  }

  if (type === 'osnabrück') {
    return (
      <Link href={'/osnabrueck'}>
        <Button variant={'goToOsnabrueck'}>zu dem Osnabrück-Dashboard</Button>
      </Link>
    )
  }

  if (type === 'lübeck') {
    return (
      <Link href={'/luebeck'}>
        <Button variant={'goToLuebeck'}>zu dem Lübeck-Dashboard</Button>
      </Link>
    )
  }

  // this should never be reached
  return <Button>zu den Daten</Button>
}
