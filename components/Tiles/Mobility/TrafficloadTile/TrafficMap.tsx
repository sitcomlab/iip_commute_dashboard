import { map } from '@/utils/map'
import { animated, useSpring } from '@react-spring/web'
import * as React from 'react'
import { SVGProps } from 'react'

const MIN_RADIUS = 50
const MAX_RADIUS = 100

interface TrafficMapProps extends SVGProps<SVGSVGElement> {
  albersloher: number
  warendorfer: number
  weseler: number
  rishon: number
  steinfurter: number
}

export default function TrafficMap({
  albersloher,
  warendorfer,
  weseler,
  rishon,
  steinfurter,
  ...props
}: TrafficMapProps) {
  const values = Object.values([
    albersloher,
    warendorfer,
    weseler,
    rishon,
    steinfurter,
  ])
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  const albersloherRadius = useSpring({
    val: map(albersloher, minValue, maxValue, MIN_RADIUS, MAX_RADIUS),
    from: { val: 0 },
  })
  const warendorferRadius = useSpring({
    val: map(warendorfer, minValue, maxValue, MIN_RADIUS, MAX_RADIUS),
    from: { val: 0 },
  })
  const weselerRadius = useSpring({
    val: map(weseler, minValue, maxValue, MIN_RADIUS, MAX_RADIUS),
    from: { val: 0 },
  })
  const rishonRadius = useSpring({
    val: map(rishon, minValue, maxValue, MIN_RADIUS, MAX_RADIUS),
    from: { val: 0 },
  })
  const steinfurterRadius = useSpring({
    val: map(steinfurter, minValue, maxValue, MIN_RADIUS, MAX_RADIUS),
    from: { val: 0 },
  })

  console.log(map(steinfurter, minValue, maxValue, MIN_RADIUS, MAX_RADIUS))

  return (
    <svg
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      }}
      viewBox="0 0 555 586"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      {...props}
    >
      <path
        d="m302.372 16.31-11.05 24.465-30.363 9.489L215.377 0l-24.838 10.873V29.9l-30.388 9.514-64.894 31.238-4.144 44.828-28.981 20.387 12.431 84.244-64.894 52.983L0 317.922l57.988 17.669-16.575 52.983 9.669 47.546 42.794-8.155 11.05 43.493 19.338 46.187 13.813 29.877 31.744 29.9 45.557 8.155 15.194-35.338 24.863 6.8 26.219-19 5.525-43.493 46.938 6.8 41.438 14.951L393.51 495.9l-30.388-47.546-4.144-21.747 30.388-8.13 57.988 25.8 23.456-6.8 12.431-35.314 23.481-21.747-15.192-29.874-26.244-25.824-8.262-40.75-23.481-31.261-4.144-55.7 27.625-29.877L414.2 91.039l-16.575-16.31h-30.359l-27.625-24.465-37.269-33.954Z"
        style={{
          fill: '#34c17b',
          fillOpacity: 0.15,
          fillRule: 'nonzero',
        }}
        transform="translate(43.7)"
      />
      <path
        d="M-8123.03-5200.61a283.54 283.54 0 0 1 30.96 42.57c14.68 24.82 47.73 57.42 62.73 60.52 15 3.11 24.96 6.09 45.19 8.81 20.22 2.72 26.04-3.31 42.7 14.5 16.65 17.81 44.39 46.42 44.39 46.42l8.89 2.88"
        style={{
          fill: 'none',
          fillRule: 'nonzero',
          stroke: '#fff',
          strokeWidth: 3,
        }}
        transform="translate(8169.63 5278.8)"
      />
      <path
        d="M-8202.52-4693.91s36.95 14.43 53.53 9.41c16.57-5.02 68.21-29.92 68.21-29.92s43.12-10.82 62.03-12.15c18.9-1.34 37.16-2.32 51.78-28.57 14.62-26.25 34.21-61.02 34.21-61.02l11.45-19.05v-27.86l32.46 11.82"
        style={{
          fill: 'none',
          fillRule: 'nonzero',
          stroke: '#fff',
          strokeWidth: 3,
        }}
        transform="translate(8203.07 5117)"
      />
      <path
        d="m-7530.01-4640.43-28.66-32.79h-10.12l-10.39-41.58-32.37-40.17s-19.94-30.39-32.45-43.09c-12.51-12.7-31.83-34.63-31.83-34.63v-11.68l2.04-11.91"
        style={{
          fill: 'none',
          fillRule: 'nonzero',
          stroke: '#fff',
          strokeWidth: 3,
        }}
        transform="translate(7981.5 5128.9)"
      />
      <path
        d="m-7414.53-5015.68-12.81 7.6-12.09 15.24h-41.63l-82.28 20.87-22.9 7.4h-14.46l-44.67 18.73"
        style={{
          fill: 'none',
          fillRule: 'nonzero',
          stroke: '#fff',
          strokeWidth: 3,
        }}
        transform="translate(7968.68 5201)"
      />
      <path
        d="m-9781.42-4579.91 14.62.86 12.98-12.48 15.89-17.28"
        style={{
          fill: 'none',
          fillRule: 'nonzero',
          stroke: '#fff',
          strokeWidth: 3,
        }}
        transform="translate(10062 4863.6)"
      />
      <path
        d="m2858.24-266.908 17.18 51.67-8.56 17.876v58.845l-8.62 6.616-20.97 57.426-3.47 4.775-6.4 31.1v12.771"
        style={{
          fill: 'none',
          fillRule: 'nonzero',
          stroke: '#fff',
          strokeWidth: 3,
        }}
        transform="translate(-2479.7 271.7)"
      />
      <path
        d="m500.971 8373 68.77 10.42 48.949 33.83 68.684 53.53"
        style={{
          fill: 'none',
          fillRule: 'nonzero',
          stroke: '#fff',
          strokeWidth: 2,
        }}
        transform="translate(-471.8 -8087.6)"
      />
      <path
        d="m653.293 782.978-10.155-8.584v-40.638l7.728-8.683M663.1 486.23v26.633l3.727 9.715v15.175l-3.727 24.14-3.447 102.027v68.548"
        style={{
          fill: 'none',
          fillRule: 'nonzero',
          stroke: '#fff',
          strokeWidth: 3,
        }}
        transform="translate(-385.8 -481.5)"
      />
      <g transform="matrix(.61412 0 0 .60358 256.874 158.75)">
        <clipPath id="Pendler_Karte_With_Stations_svg__a">
          <path d="M0 0h60.5v56.5H0z" />
        </clipPath>
        <animated.g
          clipPath="url(#Pendler_Karte_With_Stations_svg__a)"
          style={{
            scale: steinfurterRadius.val.to(v => (v / 100).toFixed(0)),
          }}
        >
          <path
            d="M58 4c0-2.208-1.792-4-4-4H4C1.792 0 0 1.792 0 4v14c0 2.208 1.792 4 4 4h50c2.208 0 4-1.792 4-4V4Z"
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(1.25 27.25)"
          />
          <path
            d="M716 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(6.25 32.25)"
          />
          <path
            d="m707 129 1.574-20.46c.239-3.109 2.864-5.54 5.982-5.54h30.888c3.118 0 5.743 2.431 5.982 5.54L753 129"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(46.25 32.25)"
          />
          <path
            d="M753 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4M740 151v-8c0-1.097-.903-2-2-2h-16c-1.097 0-2 .903-2 2v8"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
        </animated.g>
      </g>
      <animated.circle
        cx={236.827}
        cy={364.68}
        r={steinfurterRadius.val.to(v => v.toFixed(0))}
        style={{
          fill: '#34c17b',
          fillOpacity: 0.15,
        }}
        transform="matrix(.7832 0 0 .7832 89.97 -109.814)"
      />
      <g transform="matrix(.61412 0 0 .60358 189.746 264.518)">
        <clipPath id="Pendler_Karte_With_Stations_svg__b">
          <path d="M0 0h60.5v56.5H0z" />
        </clipPath>
        <animated.g
          clipPath="url(#Pendler_Karte_With_Stations_svg__b)"
          style={{
            scale: 0.5,
          }}
        >
          <path
            d="M58 4c0-2.208-1.792-4-4-4H4C1.792 0 0 1.792 0 4v14c0 2.208 1.792 4 4 4h50c2.208 0 4-1.792 4-4V4Z"
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(1.25 27.25)"
          />
          <path
            d="M716 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(6.25 32.25)"
          />
          <path
            d="m707 129 1.574-20.46c.239-3.109 2.864-5.54 5.982-5.54h30.888c3.118 0 5.743 2.431 5.982 5.54L753 129"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(46.25 32.25)"
          />
          <path
            d="M753 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4M740 151v-8c0-1.097-.903-2-2-2h-16c-1.097 0-2 .903-2 2v8"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
        </animated.g>
      </g>
      <animated.circle
        cx={236.827}
        cy={364.68}
        r={rishonRadius.val.to(v => v.toFixed(0))}
        style={{
          fill: '#34c17b',
          fillOpacity: 0.15,
        }}
        transform="matrix(.7832 0 0 .7832 22.842 -4.046)"
      />
      <g transform="matrix(.61412 0 0 .60358 255.412 386.033)">
        <clipPath id="Pendler_Karte_With_Stations_svg__c">
          <path d="M0 0h60.5v56.5H0z" />
        </clipPath>
        <g clipPath="url(#Pendler_Karte_With_Stations_svg__c)">
          <path
            d="M58 4c0-2.208-1.792-4-4-4H4C1.792 0 0 1.792 0 4v14c0 2.208 1.792 4 4 4h50c2.208 0 4-1.792 4-4V4Z"
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(1.25 27.25)"
          />
          <path
            d="M716 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(6.25 32.25)"
          />
          <path
            d="m707 129 1.574-20.46c.239-3.109 2.864-5.54 5.982-5.54h30.888c3.118 0 5.743 2.431 5.982 5.54L753 129"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(46.25 32.25)"
          />
          <path
            d="M753 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4M740 151v-8c0-1.097-.903-2-2-2h-16c-1.097 0-2 .903-2 2v8"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
        </g>
      </g>
      <animated.circle
        cx={236.827}
        cy={364.68}
        r={weselerRadius.val.to(v => v.toFixed(0))}
        style={{
          fill: '#34c17b',
          fillOpacity: 0.15,
        }}
        transform="matrix(.7832 0 0 .7832 88.508 117.469)"
      />
      <g transform="matrix(.61412 0 0 .60358 422.717 201.78)">
        <clipPath id="Pendler_Karte_With_Stations_svg__d">
          <path d="M0 0h60.5v56.5H0z" />
        </clipPath>
        <g clipPath="url(#Pendler_Karte_With_Stations_svg__d)">
          <path
            d="M58 4c0-2.208-1.792-4-4-4H4C1.792 0 0 1.792 0 4v14c0 2.208 1.792 4 4 4h50c2.208 0 4-1.792 4-4V4Z"
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(1.25 27.25)"
          />
          <path
            d="M716 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(6.25 32.25)"
          />
          <path
            d="m707 129 1.574-20.46c.239-3.109 2.864-5.54 5.982-5.54h30.888c3.118 0 5.743 2.431 5.982 5.54L753 129"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(46.25 32.25)"
          />
          <path
            d="M753 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4M740 151v-8c0-1.097-.903-2-2-2h-16c-1.097 0-2 .903-2 2v8"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
        </g>
      </g>
      <animated.circle
        cx={236.827}
        cy={364.68}
        r={warendorferRadius.val.to(v => v.toFixed(0))}
        style={{
          fill: '#34c17b',
          fillOpacity: 0.15,
        }}
        transform="matrix(.7832 0 0 .7832 255.813 -66.785)"
      />
      <g transform="matrix(.61412 0 0 .60358 331.166 313.434)">
        <clipPath id="Pendler_Karte_With_Stations_svg__e">
          <path d="M0 0h60.5v56.5H0z" />
        </clipPath>
        <g clipPath="url(#Pendler_Karte_With_Stations_svg__e)">
          <path
            d="M58 4c0-2.208-1.792-4-4-4H4C1.792 0 0 1.792 0 4v14c0 2.208 1.792 4 4 4h50c2.208 0 4-1.792 4-4V4Z"
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(1.25 27.25)"
          />
          <path
            d="M716 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(6.25 32.25)"
          />
          <path
            d="m707 129 1.574-20.46c.239-3.109 2.864-5.54 5.982-5.54h30.888c3.118 0 5.743 2.431 5.982 5.54L753 129"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
          <circle
            cx={4}
            cy={4}
            r={4}
            style={{
              fill: 'none',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(46.25 32.25)"
          />
          <path
            d="M753 151v4c0 1.097-.903 2-2 2h-5c-1.097 0-2-.903-2-2v-4M740 151v-8c0-1.097-.903-2-2-2h-16c-1.097 0-2 .903-2 2v8"
            style={{
              fill: 'none',
              fillRule: 'nonzero',
              stroke: '#34c17b',
              strokeWidth: '2.5px',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
            transform="translate(-699.75 -101.75)"
          />
        </g>
      </g>
      <animated.circle
        cx={236.827}
        cy={364.68}
        r={albersloherRadius.val.to(v => v.toFixed(0))}
        style={{
          fill: '#34c17b',
          fillOpacity: 0.15,
        }}
        transform="matrix(.7832 0 0 .7832 164.262 44.87)"
      />
    </svg>
  )
}
