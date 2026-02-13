import EventCards from "@/components/EventCards"
import ExploreBtn from "@/components/ExploreBtn"
import { IEvent } from "@/database";



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const page = async () => {
const response = await fetch(`${BASE_URL}/api/events`)
const {events} = await response.json()

  return (
    <section>
      <h1 className='text-center font-bold tracking-tight'>The hub for every dev <br />Events you Can't miss</h1>
      <p className='text-center mt-5'>Hacktons, Meetups and conferences, All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h1>Featured Events</h1>

        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <span key={event._id} className="list-none">
              <EventCards {...event} />
            </span>
          ))}
        </ul>

      </div>
    </section>
  )
}

export default page