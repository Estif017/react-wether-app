import React from 'react'

const TopButtons = ({searchCities}) => {
  const cities=[
    {
    id:1,
    cityName:'Los Angeles'
  },
    {
    id:2,
    cityName:'New York'
  },
    {
    id:3,
    cityName:'Tokio'
  },
    {
    id:4,
    cityName:'London'
  },
    {
    id:5,
    cityName:'Paris'
  },
]
  return (
    <div className='flex items-center justify-around my-6'>
      {cities.map(city=> <button key={city.id} onClick={()=>searchCities({q:city.cityName})} className='text-white text-lg font-medium'>{city.cityName}</button> )}
    </div>
  )
}

export default TopButtons