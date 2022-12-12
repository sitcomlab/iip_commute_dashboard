'use client'

import { ComponentPropsWithRef, useEffect } from 'react'
import { animated, AnimatedProps, useSpring } from 'react-spring'

export type SurveyAnswerProps = AnimatedProps<ComponentPropsWithRef<'div'>> & {
  percent: number
  text: string
}

export default function SurveyAnswer({
  percent,
  text,
  ...props
}: SurveyAnswerProps) {
  const [animatedNumber, api] = useSpring({ val: 0 }, [])

  useEffect(() => {
    api({ val: percent })
  }, [percent])

  return (
    <animated.div className="absolute top-0 left-0 w-full" style={{ ...props }}>
      <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4">
        <span className="text-5xl font-medium md:text-7xl">
          <animated.span>
            {animatedNumber.val.to(val => val.toFixed(0))}
          </animated.span>
          %
        </span>
        <p className="text-lg">{text}</p>
      </div>
    </animated.div>
  )
}
