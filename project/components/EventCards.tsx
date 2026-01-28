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
      className="group block overflow-hidden rounded-xl"
    >
      {/* Image */}
      <div className="relative h-[260px] w-full overflow-hidden">
        <Image
          src={image}
          alt="Event Image"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />

        {/* Text Content */}
        <div className="absolute bottom-0 z-10 w-full p-4 text-white">
          <p className="text-lg font-semibold leading-tight">
            {title}
          </p>

          <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-200">
            <div className="flex items-center gap-1">
              <Image src="/icons/pin.svg" alt="location" width={12} height={12} />
              <span>{location}</span>
            </div>

            <div className="flex items-center gap-1">
              <Image src="/icons/calendar.svg" alt="date" width={12} height={12} />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-1">
              <Image src="/icons/clock.svg" alt="time" width={12} height={12} />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCards;
