import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main>
    <h1>User dashboard</h1>

    <ul className='text-5xl'>
        <li><Link href= '/dashboard/user/1'> user1 </Link></li>
        <li><Link href= '/dashboard/user/2'> user2 </Link></li>
        <li><Link href= '/dashboard/user/3'> user3 </Link></li>
        <li><Link href= '/dashboard/user/4'> user4 </Link></li>
        <li><Link href= '/dashboard/user/5'> user5 </Link></li>
    </ul>

    </main>
  )
}

export default page