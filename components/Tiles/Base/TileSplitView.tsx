import { cx } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

export function TileSplitView(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="flex flex-col gap-10 lg:flex-row" {...props} />
}

TileSplitView.Left = function LeftView(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx(props.className, 'min-h-[30rem] flex-1')} />
  )
}

TileSplitView.Right = function Rightiew(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className="lg:max-w-[272px]" />
}
