import Link from 'next/link'
import StairStepBackground from '../StairStepBackground'

export default function Footer() {
  return (
    <StairStepBackground>
      <div className="flex w-full flex-col items-center justify-around  sm:flex-row">
        <div>Ein Projekt von</div>
        <div>Gefördert durch</div>
        <div className="flex flex-col">
          <Link href="#">Impressum</Link>
          <Link href="#">Datenschutz</Link>
          <Link href="#">Sie haben Feedback für uns?</Link>
        </div>
      </div>
    </StairStepBackground>
  )
}
