import Image from "next/image";
import Link from "next/link";

interface Props {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCards = ({ image, title, slug, location, time, date }: Props) => {
    return (

        <Link
            href={`/events/${slug}`}
            className="group flex flex-col gap-4 p-4 hover:scale-[1.02] transition"
        >
            {/* Event Image */}
            <Image
                src={image}
                alt={title}
                width={410}
                height={300}
                className="poster rounded-lg object-cover"
            />

            {/* Location */}
            <div className="flex items-center gap-2 text-light-200 text-sm">
                <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
                <span className="truncate">{location}</span>
            </div>

            {/* Title */}
            <p className="title text-lg font-semibold leading-tight">
                {title}
            </p>

            {/* Date & Time */}
            <div className="flex items-center gap-6 text-light-200 text-sm">
                <div className="flex items-center gap-2">
                    <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
                    <span>{date}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
                    <span>{time}</span>
                </div>
            </div>
        </Link>


    )
}

export default EventCards