import * as React from 'react'

const sizes = {
  sm: 'my-4',
  md: 'my-8',
  lg: 'my-16',
}

export type SpacerProps = {
  size?: keyof typeof sizes
}

/**
 *
 * @param SpacerProps size of the spacer
 * @returns A spacer to create some space 🧑‍🚀
 */
export function Spacer({ size = 'md' }: SpacerProps) {
  return <div className={sizes[size]}></div>
}
