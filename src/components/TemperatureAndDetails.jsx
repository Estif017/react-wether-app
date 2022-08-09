import React from 'react'
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFormCode } from '../utils/api'

const TemperatureAndDetails = ({weather:{ details,
  icon,
  temp,
  temp_min,
  temp_max,
  sunrise,
  sunset,
  speed,
  humidity,
  feels_like,
  timezone,},units}) => {
    const unit=units==='metric'?'C':'F'
  return (
    <div>
      <div className='flex justify-center items-center py-6 text-xl text-cyan-300 '>
        <p>{details}</p>
      </div>
      <div className='flex justify-between items-center text-row py-3 text-white '>
        <img src={iconUrlFormCode(icon)} alt="img" className='w-20' />
        <p className="text-5xl">{temp.toFixed()}&deg; {unit}</p>
        <div className='flex flex-col space-y-2'>
          <div className='flex justify-center items-center font-light text-sm'>
            <UilTemperature size={18} className='mr-1' />
            Real fell:
            <span className='font-medium ml-1'>{feels_like.toFixed()}&deg;</span>
          </div>
          <div className='flex justify-center items-center font-light text-sm'>
            <UilTear size={18} className='mr-1' />
            Humidity:
            <span className='font-medium ml-1'>{humidity.toFixed()}%</span>
          </div>
          <div className='flex justify-center items-center font-light text-sm'>
            <UilWind size={18} className='mr-1' />
            Wind:
            <span className='font-medium ml-1'>{speed.toFixed()} km/hr</span>
          </div>
        </div>
      </div>
      <div className='flex flex-row space-x-2 text-white items-center justify-center py-3 text-sm font-light'>
        <UilSun />
        <p>
          Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise,timezone,'hh:mm a')}</span>
        </p>
        <p>|</p>
        <UilSunset />
        <p>
          Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset,timezone,'hh:mm a')}</span>
        </p>
        <p>|</p>
        <UilArrowUp />
        <p>
          High: <span className='font-medium ml-1'>{temp_max.toFixed()}&deg;</span>
        </p>
        <p>|</p>
        <UilArrowDown />
        <p>
          Low: <span className='font-medium ml-1'>{temp_min.toFixed()}&deg;</span>
        </p>
      </div>
    </div>
  )
}

export default TemperatureAndDetails