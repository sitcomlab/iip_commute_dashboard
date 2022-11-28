import InsightsTile from './InsightsTile'

export default function InsightsContainer() {
  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-0 -z-10 h-1/3 w-full bg-primary-50"></div>
      <div className="container mx-auto p-8">
        <div className="mb-8 flex w-full justify-end">
          <span className="text-4xl text-green-500">Einblicke</span>
        </div>
        <div className="flex w-full items-center justify-between space-x-4">
          <InsightsTile title="Große Projekte - große Wirkung" />
          <InsightsTile title="Große Projekte - große Wirkung" />
          <InsightsTile title="Große Projekte - große Wirkung" />
        </div>
      </div>
    </div>
  )
}
