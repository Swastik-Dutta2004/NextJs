import React from 'react'
import Link from 'next/link'

const user = () => {
  return (
    <div>
        <h1>dashboards</h1>

        <ul>
            <li><Link href= "/dashboards/user/1"> User 1</Link></li>
            <li><Link href="/dashboards/user/2"> User 2</Link> </li>
            <li><Link href="/dashboards/user/3"> User 3</Link></li>
            <li><Link href="/dashboards/user/4"> User 4</Link></li>
            <li><Link href="/dashboards/user/5"> User 5</Link></li>
        </ul>
    </div>
  )
}

export default user