import { events } from '@/lib/constant';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetails = ({icon, alt, lable}: {icon: string; alt: string; lable: string}) => (
  <div>
    <Image src={icon} alt={alt} width={20} height={20} className='flex items-center gap-2'/>
    <p>{lable}</p>
  </div>
)
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`)
  const { event: { description, image, time, date, overview, location, agenda, mode, audience, organizer, tags } } = await request.json();

  if (!description) return notFound();
  return (
    <section id='event'>
      <div className="header">
        <h1>Events Description: </h1>
        <p className=''>{description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image src={image} alt='Image Tag' width={800} height={800} className='Banner'/>

          <section className='flex-col gap-2'>
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className='flex-col gap-2'>
            <h2>Event Details</h2>

            <EventDetails icon= "/icons/calendar.svg" alt='calender' lable= {date}/>
            <EventDetails icon= "/icons/clock.svg" alt='clock' lable= {time}/>
            <EventDetails icon= "/icons/audience.svg" alt='audience' lable= {mode}/>
            <EventDetails icon= "/icons/mode.svg" alt='mode' lable= {mode}/>
          </section>
        </div>
        

       

        <aside>
          <p className='text-lg font-semibold'>Event Book</p>
        </aside>
      </div>
    </section>
  )
}

export default page