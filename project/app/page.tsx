import ExploreBtn from "@/components/ExploreBtn"



const page = () => {
  return (
    <section>
      <h1 className='text-center'>The hub for every dev <br />Events you Can't miss</h1>
      <p className='text-center mt-5'>Hacktons, Meetups and conferences, All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h1>Featured Events</h1>

        <ul className="events">
          {[1, 2, 3, 4, 5].map((event) => (
            <li key={event}>Event {event}</li>
          ))}
        </ul>

      </div>
    </section>
  )
}

export default page