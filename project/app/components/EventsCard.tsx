import Image from 'next/image'
import Link from 'next/link'


interface props {
    title: string;
    image: string;
    slug: string;
    location: string;
    Date: string;
    time: string;
}

const EventsCard = ({ image, title,slug,location,Date,time }: props) => {
    return (
        <Link href='/events/${slug}' id='event-card'>
            <Image src={image} alt={title} width={412} height={412} className= "poster" />

            <div className='flex flex-wrap gap-2'>
                <Image src= "/icons/pin.svg" alt='location' width={14} height={14}/>
                <p>{location}</p>
            </div>

            <p className='title'>{title}</p>

            <div className="date">
                <Image src= "/icons/calender.svg" alt='location' width={14} height={14}/>
                <p>{Date}</p>
            </div>

            <div className="date">
                <Image src= "/icons/time.svg" alt='location' width={14} height={14}/>
                <p>{time}</p>
            </div>
        </Link>
    )
}

export default EventsCard