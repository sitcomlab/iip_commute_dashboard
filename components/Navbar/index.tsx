import Image from 'next/image'
import StairStepBackground from '../Elements/StairStepBackground'
import MSLogo from '@/assets/logos/stadtlogo-muenster.png'
import { Button } from '../Elements/Button'
import Link from 'next/link'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

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
              <h1 className="text-5xl text-primary">
                Klimadashboard <br />
                Münster
              </h1>
              <Link
                className="mt-4 flex items-center space-x-1 text-primary"
                href={'#'}
              >
                <InformationCircleIcon className="h-5" />
                <span className="text-sm font-semibold underline">
                  Mehr Details
                </span>
              </Link>
            </div>
            <div className="flex h-fit space-x-2">
              <Button>Klima in Münster</Button>
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
