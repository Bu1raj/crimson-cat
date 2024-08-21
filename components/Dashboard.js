'use client'
import { Caveat_Brush } from 'next/font/google'
import React, {useEffect, useState} from 'react'
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import Loading from './Loading';
import Login from './Login';
import { db } from '@/firebase';
const caveat_brush = Caveat_Brush({ subsets: ["latin"], weight:["400"]});

export default function Dashboard() {
  const {currentUser, userDataObj, setUserDataObj, loading} = useAuth()
  const [data, setData] = useState({})
  const now = new Date()

  function countValues(){
    let total_number_of_days = 0
    let sum_moods = 0
    
    for (let year in data){
      for (let month in data[year]){
        for ( let day in data[year][month]){
          total_number_of_days++
          sum_moods += data[year][month][day]
        }
      }
    }

    return {num_days: total_number_of_days, average_mood: (sum_moods/total_number_of_days).toFixed(2)}
  }

  const statuses ={
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  }

  async function handleSetMood(mood){
    const year = now.getFullYear()
    const month = now.getMonth()
    const day = now.getDate()

    try{
      const newData = {...userDataObj}

      if (!newData?.[year]){
        newData[year] = {}
      }

      if (!newData[year]?.[month]){
        newData[year][month] = {}
      }
      newData[year][month][day] = mood

      // update the current state
      setData(newData)
      // update the global state
      setUserDataObj(newData)
      // update firebase
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, {merge: true})
    }catch(e){
      console.log(e.message)
    }
  }

  const moods = {
    '&*@#$': '😡',
    'Sad': '😢',
    'Bored': '😑',
    'Confused': '😕',
    'Excited': '😀',
  }

  useEffect(() => {
    if (!currentUser || !userDataObj){
      return
    }
    setData(userDataObj)
  }, [currentUser, userDataObj])

  if (loading){
    return <Loading />
  }

  if(!currentUser){
    return <Login />
  }

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-10 md:gap-16'>
      <div className='p-4 grid grid-cols-3 gap-4 bg-rose-100 text-[#ff4c4c] rounded-lg'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
              <p className={'text-base sm:text-lg truncate ' + caveat_brush.className}>{statuses[status]}{status === 'num_days' ? '🔥' : ''}</p>
            </div>
          )
        })}
      </div>
      <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + caveat_brush.className}>
        How do you
        <span className='textGradient'> feel </span>
        today?
      </h4>

      <div className='flex items-stretch flex-wrap gap-4 '>
        {Object.keys(moods).map((mood, moodIndex) => {
          return(
            <button onClick={() => {
              const currentMood = moodIndex + 1
              handleSetMood(currentMood)
            }} 
            className={'flex flex-col gap-2 items-center flex-1 p-4 px-5 rounded-2xl crimsonShadow duration-200 bg-rose-100 hover:bg-[#fecaca] text-center '} key={moodIndex}>
              <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
              <p className={'text-[#ff4c4c] text-xs sm:text-sm md:text-base ' + caveat_brush.className}>{mood}</p>
            </button>
          )
        })}
      </div>

      <Calendar completedData={data} handleSetMood={handleSetMood}/>
    </div>
  )
}
