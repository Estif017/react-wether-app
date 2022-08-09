import React from 'react'
import { iconUrlFormCode } from '../utils/api'

const Forecasts = ({title,forecast}) => { 
  return (
    <div>
      <div className='flex justify-start items-center mt-6'>
        <p className='text-white font-medium uppercase'>{title}</p>
      </div>
      <hr className='my-2'/>

      <div className='flex items-center justify-between text-white flex-row'>
        {forecast.map((f,i)=>(
          <div key={i}>
        <div  className='flex items-center justify-center flex-col'>
          <p className='font-light text-sm'>{f.title}</p>
          <img src={iconUrlFormCode(f.icon)} alt="img" className='w-12 my-1' />
          <p className="font-medium">{f.temp.toFixed()}&deg;</p>
        </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecasts