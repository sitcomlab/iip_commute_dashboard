export type ColumnsProps = {
  children: React.ReactNode | React.ReactNode[]
}

export default function Columns({ children }: ColumnsProps) {
  return <div className="gap-4 md:gap-8 lg:columns-2">{children}</div>
}
