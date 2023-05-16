import * as React from 'react'
import { SVGProps } from 'react'
function SvgSquaresPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-name="01 align center"
      viewBox="0 0 24.41 24.41"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 3.051v8.137h11.188V0H3.051A3.051 3.051 0 0 0 0 3.051zm9.154 6.1h-7.12v-6.1a1.017 1.017 0 0 1 1.017-1.017h6.1z"
        data-name="Pfad 199"
      />
      <path
        d="M0 21.137a3.051 3.051 0 0 0 3.051 3.051h8.137V13H0zm2.034-6.1h7.12v7.12h-6.1a1.017 1.017 0 0 1-1.017-1.017z"
        data-name="Pfad 200"
        transform="translate(0 .222)"
      />
      <path
        d="M13 13v11.188h8.137a3.051 3.051 0 0 0 3.051-3.051V13zm9.154 8.137a1.017 1.017 0 0 1-1.017 1.017h-6.1v-7.12h7.12z"
        data-name="Pfad 201"
        transform="translate(.222 .222)"
      />
      <path
        d="M17.068 11.171H19.1V7.1h4.068V5.068H19.1V1h-2.032v4.068H13V7.1h4.068z"
        data-name="Pfad 202"
        transform="translate(.222 .017)"
      />
    </svg>
  )
}
export default SvgSquaresPlus
