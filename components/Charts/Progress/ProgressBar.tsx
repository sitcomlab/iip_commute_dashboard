'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'

interface Props {
  progress: number
}

function ProgressBar({ progress }: Props) {
  return (
    <div className="rounded-full border-2 border-primary p-[.25rem]">
      <ProgressPrimitive.Root
        className="h-3 w-full overflow-hidden rounded-full"
        value={progress}
      >
        <ProgressPrimitive.Indicator
          className="flex h-full rounded-full bg-primary duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export default ProgressBar
