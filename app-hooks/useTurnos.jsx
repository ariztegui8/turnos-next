import React, { useState } from 'react'

const useTurnos = () => {

    const [dateTurnos, setDateTurnos] = useState([])

  return { dateTurnos, setDateTurnos }
}

export default useTurnos