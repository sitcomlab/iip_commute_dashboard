'use client'

import Link from 'next/link'
import StairStepBackground from '../StairStepBackground'
import Title from '@/components/Elements/Title'
import Container from '../Container'
import Image from 'next/image'

import SmartCityMSLogo from '@/assets/logos/smart_city_ms.png'
import MuensterKlima2030 from '@/assets/logos/muenter_unser_klima_2030.png'
import StadtwerkeLogo from '@/assets/logos/Stadtwerke_Muenster_Logo.png'
import WFMLogo from '@/assets/logos/logo_wfm.png'
import BMWSBLogo from '@/assets/logos/BMWSB.png'
import KFW from '@/assets/logos/kfw.png'

function UnCryptMailto(s: string) {
  var n = 0
  var r = ''
  for (var i = 0; i < s.length; i++) {
    n = s.charCodeAt(i)
    if (n >= 8364) {
      n = 128
    }
    r += String.fromCharCode(n - 1)
  }
  return r
}

function linkTo_UnCryptMailto(s: string) {
  location.href = UnCryptMailto(s)
}

export default function Footer() {
  return (
    <StairStepBackground>
      <Container>
        <div className="items-top flex w-full flex-col justify-around pb-10 lg:flex-row lg:gap-20 xl:pb-20 2xl:gap-44">

          <div className="flex flex-1 flex-col sm:hidden 2xl:flex">
            <Title as={'h4'} className="py-10 opacity-0 md:py-20">
              Impressum
            </Title>
            <div className="flex flex-1 flex-col justify-between gap-8">
              <Link href="/impressum">
                <Title as="h5" className="underline" variant={'primary'}>
                  Impressum
                </Title>
              </Link>
              <Link href="/datenschutz">
                <Title as="h5" className="underline" variant={'primary'}>
                  Datenschutz
                </Title>
              </Link>
              {/* https://www.math.uni-hamburg.de/it/dienste/encryptma.html */}
              <a
                className="cursor-pointer"
                onClick={() =>
                  linkTo_UnCryptMailto('nbjmup;lmjnbAtubeu.nvfotufs/ef')
                }
              >
                <Title as="h5" className="underline" variant={'primary'}>
                  Sie haben Feedback für uns?
                </Title>
              </a>
            </div>
          </div>
        </div>
        <div className="hidden justify-between sm:flex 2xl:hidden">
          <Link href="/impressum">
            <Title as="h5" className="underline" variant={'primary'}>
              Impressum
            </Title>
          </Link>
          <Link href="/datenschutz">
            <Title as="h5" className="underline" variant={'primary'}>
              Datenschutz
            </Title>
          </Link>
          <a
            className="cursor-pointer"
            onClick={() =>
              linkTo_UnCryptMailto('nbjmup;lmjnbAtubeu.nvfotufs/ef')
            }
          >
            <Title as="h5" className="underline" variant={'primary'}>
              Sie haben Feedback für uns?
            </Title>
          </a>
        </div>
      </Container>
    </StairStepBackground>
  )
}
