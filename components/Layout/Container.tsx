export type ContainerProps = {
  children: React.ReactNode | React.ReactNode[]
}

export default function Container({ children }: ContainerProps) {
  return <div className="container mx-auto p-4 md:p-12">{children}</div>
}