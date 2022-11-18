import Link from 'next/link'

export default function Footer() {
  return (
    <div>
      <div className="hidden h-12 w-full md:flex">
        <div className="flex-[2_2_0%]"></div>
        <div className="flex-[3_3_0%] bg-blue-100"></div>
      </div>
      <div className="flex w-full flex-col items-center justify-around bg-blue-100 sm:flex-row">
        <div>Ein Projekt von</div>
        <div>Gefördert durch</div>
        <div className="flex flex-col">
          <Link href="#">Impressum</Link>
          <Link href="#">Datenschutz</Link>
          <Link href="#">Sie haben Feedback für uns?</Link>
        </div>
      </div>
    </div>
  )
}
