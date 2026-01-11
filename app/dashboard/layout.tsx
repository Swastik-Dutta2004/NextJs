import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div>
        Hey its the DashBoard Hearder
        {children}
        Hey its the DashBoard footer
    </div>
  )
}

export default layout