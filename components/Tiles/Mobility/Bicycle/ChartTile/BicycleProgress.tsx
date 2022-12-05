export default function BicycleProgress({ progress }: { progress: number }) {
  return (
    <div className="flex w-full">
      <div>S</div>
      <div className="flex flex-1">
        <div
          className={'h-2 bg-green-500 transition-all'}
          style={{ width: `${progress}%` }}
        ></div>
        <div>E</div>
      </div>
    </div>
  )
}
