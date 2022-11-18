function PulsatingCircle() {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" fill="none" r="10" stroke="#fff" stroke-width="2">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.5s"
          from="8"
          repeatCount="indefinite"
          to="20"
        />
        <animate
          attributeName="opacity"
          begin="0s"
          dur="1.5s"
          from="1"
          repeatCount="indefinite"
          to="0"
        />
      </circle>
      <circle cx="20" cy="20" fill="#fff" r="10" />
    </svg>
  )
}

export default function LiveBadge() {
  return (
    <div className="flex w-fit items-center space-x-1 rounded-lg bg-green-500 px-2 py-1 text-white">
      <div className="flex h-4 w-4  items-center justify-center">
        <PulsatingCircle />
      </div>
      <p className="text-xs font-semibold">LIVE</p>
    </div>
  )
}
