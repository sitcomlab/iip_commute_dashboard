'use client'

import { animated, useSpring } from 'react-spring'

type AnimatedNumberProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: number
  decimals?: number
}

export default function AnimatedNumber({
  children,
  decimals,
  ...props
}: AnimatedNumberProps) {
  const springProps = useSpring({ val: children })

  return (
    <animated.span {...props}>
      {springProps.val.to(val => val.toFixed(decimals || 0))}
    </animated.span>
  )
}
