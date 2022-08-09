import React, { useRef, useState } from 'react'
import { UilSearch,UilLocationPoint  } from '@iconscout/react-unicons'


const Inputs = ({searchCities,units,changeUnits,currentCityPosition}) => {
  const [inputValue,setInputValue]=useState('')
  const ref=useRef()

  const handleChange=(e)=>{
    setInputValue(e.target.value)
  }

  const handleSubmit=(e)=>{
    searchCities({q:inputValue})
    e.preventDefault()
  }

  const getCurrentPositionData=()=>{
    currentCityPosition()
    setInputValue('')
  }

  const handleClick=()=>{
    ref.current.focus()
  }

  const handleUnitChange=e=>{
    const selectedUnit=e.target.name
    if(selectedUnit!==units){
      changeUnits(selectedUnit)
    }
  }
  

  return (
    <div className="flex flex-row justify-center my-6">
      <form onSubmit={handleSubmit} className='flex flex-row justify-center items-center w-3/4 space-x-4'>
        <input value={inputValue} onChange={handleChange} type="text" ref={ref} placeholder='search for city...' className='text-xl font-light p-2 w-full shadow-xl outline-none capitalize placeholder:lowercase' />
        <UilSearch size={25} onClick={handleClick} className='cursor-pointer text-white transition ease-out hover:scale-125'/>
        <UilLocationPoint size={25} onClick={getCurrentPositionData} className='cursor-pointer text-white transition ease-out hover:scale-125'/>
      </form>
      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button onClick={handleUnitChange} name="metric" className='text-xl text-white font-light transition ease-out hover:scale-125'>&deg;C</button>
        <p className='text-xl text-white mx-1'>|</p>
        <button  onClick={handleUnitChange} name="imperial" className='text-xl text-white font-light transition ease-out hover:scale-125'>&deg;F</button>
      </div>
    </div>
  )
}

export default Inputs