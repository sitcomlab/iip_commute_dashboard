import SectionTitle from './SectionTitle'

export default function SectionHeader({
  variant,
}: {
  variant: 'mobility' | 'münster' | 'osnabrück'
}) {
  return (
    <div className="my-4 flex w-full items-center justify-between">
      <SectionTitle variant={variant} />
      {/* <SortTiles /> */}
    </div>
  )
}
