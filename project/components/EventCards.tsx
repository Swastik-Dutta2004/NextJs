import Image from "next/image";
import Link from "next/link";

interface Props {
  image?: string;
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
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-transparent to-cyan-400/10" />

      {/* Event Image */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
          {date}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        
        {/* Location */}
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
          <span className="truncate">{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-emerald-400 transition">
          {title}
        </h3>

        {/* Time */}
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
          <span>{time}</span>
        </div>

      </div>
    </Link>
  );
};

export default EventCards;
