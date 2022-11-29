import clsx from 'clsx'

const variants = {
  primary: 'bg-primary-50',
  secondary: 'bg-secondary-500 bg-opacity-20',
}

export type StairStepBackgroundProps = {
  variant?: keyof typeof variants
  children: React.ReactNode
}

export default function StairStepBackground({
  variant = 'primary',
  children,
}: StairStepBackgroundProps) {
  return (
    <div>
      <div className="hidden h-12 w-full md:flex">
        <div className="flex-[2_2_0%]"></div>
        <div className={clsx('flex-[3_3_0%]', variants[variant])}></div>
      </div>
      <div className={variants[variant]}>{children}</div>
    </div>
  )
}
