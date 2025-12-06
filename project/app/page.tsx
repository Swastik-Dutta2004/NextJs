import React from 'react'
import ExploreBtn from './components/ExploreBtn'
import { title } from 'process'
import EventsCard from './components/EventsCard'
import events from '@/lib/constants'


const page = () => {
  return (
    <section>
    <h1 className='text-center'>The Hub for Every day <br/> Event you Can't Miss</h1>
    <p className='text-center ml-5'>Hackthon, Meetup and conferance All in one place</p>
    <ExploreBtn/>

    <div className='mt-20 space-y-7'>
      <h3>Featured Events</h3>

      <ul className='events'>
        {events.map((event) => (
          <li key={event.title}>
            <EventsCard {...event}/>

          </li>
        ))}
      </ul>
    </div>
    </section>
    
  )
}

export default page