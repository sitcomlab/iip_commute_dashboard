import SuccessStoryTile from '@/components/Tiles/SuccessStoryTile'

export default async function Embed({ params }: { params: { id: string } }) {
  return (
    <SuccessStoryTile
      endImage={
        <img src="https://www.stadt-muenster.de/fileadmin/user_upload/stadt-muenster/obm/pics/vorschau-lewe-lambertikirchplatz-m.jpg" />
      }
    >
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia cumque
        repellat officia sunt quibusdam ut, hic eaque quo! Expedita porro magni
        beatae ad veritatis explicabo numquam quidem nisi eius! Nihil.
        <span>{params.id}</span>
      </div>
    </SuccessStoryTile>
  )
}
