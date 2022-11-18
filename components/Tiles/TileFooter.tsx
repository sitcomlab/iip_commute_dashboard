type TileFooterProps = {
  children?: React.ReactElement
}

/**
 * A footer for all tiles with sharing, export and embed button as well as a more information link
 * @returns TileFooter
 */
export default function TileFooter({ children }: TileFooterProps) {
  return (
    <div className="flex w-full justify-between">
      <div>Sharing</div>
      {children}
      <div>Info</div>
    </div>
  )
}
