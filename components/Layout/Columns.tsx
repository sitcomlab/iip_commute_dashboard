export type ColumnsProps = {
  children: React.ReactNode | React.ReactNode[]
}

export default function Columns({ children }: ColumnsProps) {
  return <div className="gap-3 md:gap-5 lg:columns-2">{children}</div>
}
