import InsightsTile from './InsightsTile'

export default function InsightsContainer() {
  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-0 -z-10 h-1/3 w-full bg-primary-50"></div>
      <div className="container mx-auto p-12">
        <div className="mb-8 flex w-full justify-end">
          <span className="text-4xl text-secondary-500">Einblicke</span>
        </div>
        <div className="flex w-full flex-col items-center justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <InsightsTile title="Große Projekte - große Wirkung" />
          <InsightsTile title="Münster auf dem Weg zur Klimaneutralität" />
          <InsightsTile title="Große Projekte - große Wirkung" />
        </div>
      </div>
    </div>
  )
}
