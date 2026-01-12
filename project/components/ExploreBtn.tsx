'use client'

import { log } from "console"
import Image from "next/image"

const ExploreBtn = () => {
  return (
    <button className="mt-7 mx-auto" type="button" id="explore-btn" onClick={() => console.log("CLICKED")
    }>
      <a href="#events">Explore Events
        <Image src= "/icons/arrow-down.svg" alt="Arrow-Down" width={24} height={24}/>
      </a>
      
    </button>
  )
}

export default ExploreBtn