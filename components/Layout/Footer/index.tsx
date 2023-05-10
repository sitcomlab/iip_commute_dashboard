import Link from 'next/link'
import StairStepBackground from '../StairStepBackground'
import Script from 'next/script'
import Title from '@/components/Elements/Title'
import Container from '../Container'

export default function Footer() {
  return (
    <StairStepBackground>
      <Script id="linkTo_UnCryptMailto">
        {`function UnCryptMailto( s )
          {
            var n = 0;
            var r = "";
            for( var i = 0; i < s.length; i++)
            {
                n = s.charCodeAt( i );
                if( n >= 8364 )
                {
                    n = 128;
                }
                r += String.fromCharCode( n - 1 );
            }
            return r;
        }

        function linkTo_UnCryptMailto( s )
        {
            location.href=UnCryptMailto( s );
        }
      `}
      </Script>
      <Container>
        <div className="items-top flex w-full flex-col justify-around pb-10 lg:flex-row lg:gap-20 xl:pb-20 2xl:gap-44">
          <div className="flex-1">
            <Title as={'h4'} className="py-10 md:py-20">
              Ein Projekt von
            </Title>
            <div className="flex w-full grid-cols-2 flex-col gap-8 lg:gap-16 xl:grid">
              <div className="h-28 w-full bg-red-300 md:h-36">
                {/* TODO: ADD IMAGE */}
              </div>
              <div className="h-28 w-full bg-red-300 md:h-36">
                {/* TODO: ADD IMAGE */}
              </div>
              <div className="h-28 w-full bg-red-300 md:h-36">
                {/* TODO: ADD IMAGE */}
              </div>
              <div className="h-28 w-full bg-red-300 md:h-36">
                {/* TODO: ADD IMAGE */}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Title as={'h4'} className="py-10 md:py-20">
              Gefördert durch
            </Title>
            <div className="flex w-full grid-cols-2 flex-col gap-8 lg:gap-16 xl:grid">
              <div className="h-28 w-full bg-red-300 md:h-36">
                {/* TODO: ADD IMAGE */}
              </div>
              <div className="h-28 w-full bg-red-300 md:h-36">
                {/* TODO: ADD IMAGE */}
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col sm:hidden 2xl:flex">
            <Title as={'h4'} className="py-10 opacity-0 md:py-20">
              Impressum
            </Title>
            <div className="flex flex-1 flex-col justify-between gap-8">
              <Link href="https://www.stadt-muenster.de/impressum">
                <Title as="h5" className="underline" variant={'primary'}>
                  Impressum
                </Title>
              </Link>
              <Link href="https://www.stadt-muenster.de/datenschutz">
                <Title as="h5" className="underline" variant={'primary'}>
                  Datenschutz
                </Title>
              </Link>
              <a href="javascript:linkTo_UnCryptMailto('nbjmup;gffecbdlAlmjnbebticpbse/nt');">
                <Title as="h5" className="underline" variant={'primary'}>
                  Sie haben Feedback für uns?
                </Title>
              </a>
            </div>
          </div>
        </div>
        <div className="hidden justify-between sm:flex 2xl:hidden">
          <Link href="https://www.stadt-muenster.de/impressum">
            <Title as="h5" className="underline" variant={'primary'}>
              Impressum
            </Title>
          </Link>
          <Link href="https://www.stadt-muenster.de/datenschutz">
            <Title as="h5" className="underline" variant={'primary'}>
              Datenschutz
            </Title>
          </Link>
          <a href="javascript:linkTo_UnCryptMailto('nbjmup;gffecbdlAlmjnbebticpbse/nt');">
            <Title as="h5" className="underline" variant={'primary'}>
              Sie haben Feedback für uns?
            </Title>
          </a>
        </div>
      </Container>
    </StairStepBackground>
  )
}
