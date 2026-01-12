import Image from "next/image";
import Link from "next/link";

interface Props {
    image: string;
    title: string;
}

const EventCards = ({image, title}: Props) => {
  return (
    <Link href={'/events'} id="events-cards">
        <Image src={image} alt="Image" width={410} height={300}/>

        <p className="title">{title}</p>
    </Link>
  )
}

export default EventCards