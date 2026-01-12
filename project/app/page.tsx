import EventCards from "@/components/EventCards"
import ExploreBtn from "@/components/ExploreBtn"
import { title } from "process"

const events = [
  {
    image: '/images/event1.png',
    title: 'Event-1',
    slug: 'events-1',
    location: 'Loaction-1',
    date: 'Date-1',
    time: 'Time-1'
  },

]


const page = () => {
  return (
    <section>
      <h1 className='text-center'>The hub for every dev <br />Events you Can't miss</h1>
      <p className='text-center mt-5'>Hacktons, Meetups and conferences, All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h1>Featured Events</h1>

        <ul className="events">
          {events.map((event) => (
            <li key={event.title}><EventCards {...event} /></li>
          ))}
        </ul>

      </div>
    </section>
  )
}

export default page