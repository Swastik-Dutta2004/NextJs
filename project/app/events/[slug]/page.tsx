
import BookEvent from '@/components/BookEvent';
import EventCards from '@/components/EventCards';
import { IEvent } from '@/database';
import { getSimilarEventbySlug } from '@/lib/actions/events.actions';
import { cacheLife } from 'next/cache';
import Image from 'next/image';
import { notFound } from 'next/navigation';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventAgenda = ({ AgendaItems }: { AgendaItems: string[] }) => {
  return (
    <div>
      <h2>Agenda</h2>
      <ul>
        {AgendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const EventDetails = ({ icon, alt, lable, }: { icon: string; alt: string; lable: string; }) => (

  <div className="flex items-center gap-3">
    <Image
      src={icon}
      alt={alt}
      width={20}
      height={20}
      className="shrink-0"
    />
    <p className="leading-none">{lable}</p>
  </div>
);

const EventTags = ({ tagsItems }: { tagsItems: string[] }) => (
  <div className='flex flex-row gap-3 flex-wrap'>
    {tagsItems.map((tag) => (
      <div className='pill' key={tag}>{tag}</div>
    ))}
  </div>
)

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`)
  const { event } = await request.json();

  if (!event?.description) return notFound();

  const { description, image, time, date, overview, location, agenda, mode, audience, organizer, tags } = event;

  const booking = 10;
  const similarEvents: IEvent[] = await getSimilarEventbySlug(slug);

  return (
    <section id='event'>
      <div className="header">
        <h1>Events Description: </h1>
        <p className=''>{description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image src={image} alt='Image Tag' width={800} height={800} className='Banner' />

          <section className='flex-col gap-2'>
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col gap-3">
            <h2 className="font-semibold">Event Details</h2>

            <EventDetails icon="/icons/calendar.svg" alt="calendar" lable={date} />
            <EventDetails icon="/icons/clock.svg" alt="clock" lable={time} />
            <EventDetails icon="/icons/audience.svg" alt="audience" lable={audience} />
            <EventDetails icon="/icons/mode.svg" alt="mode" lable={mode} />
            <EventDetails icon="/icons/pin.svg" alt="locatoin" lable={location} />
          </section>

          <EventAgenda AgendaItems={(agenda)} />

          <section className="flex-col gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tagsItems={tags} />

        </div>

        <aside className='booking'>
          <div className='signup-card'>
            <h2>Book Your Spot</h2>
            {booking > 0 ? (
              <p className='text-sm'>
                Join {booking} people who have already booked there spot!
              </p>
            ) : (
              <p className='text-sm'>Be the first to book the spot!</p>
            )}

            <BookEvent eventId={event._id} />

          </div>
        </aside>
      </div>

      <div className='flex flex-col w-full gap-4 mt-20'>
        <h2>Similar Events: </h2>
        <div className='events'>
          {similarEvents.length > 0 && similarEvents.map((similarEvents: IEvent) => (
            <EventCards key={String(similarEvents._id)} {...similarEvents} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default page