'use client'
import { gradients, baseRating, demoData } from '@/utils'
import React, { useState } from 'react'
import { Caveat_Brush } from 'next/font/google'
const caveat_brush = Caveat_Brush({ subsets: ["latin"], weight:["400"]});

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Calendar(props) {
    const currentMonth = now.getMonth()
    const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currentMonth])
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())
    
    const { demo, completedData, handleSetMood } = props
    // const year = 2024
    // const month = 'July'
    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
    const firstDayOfMonth = monthNow.getDay()
    const daysInMonth = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate()
    const daysToDisplay = firstDayOfMonth + daysInMonth
    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)
    const numericMonth = monthsArr.indexOf(selectedMonth)
    const data = completedData?.[selectedYear]?.[numericMonth] || {}

    function handleIncrementMonth(val){
        // val +1 or -1 
        // if we hit the bounds of the months, then 
        // increment or decrement the year

        if (numericMonth + val < 0){
            setSelectedYear(curr => curr - 1)
            setSelectedMonth(monthsArr[monthsArr.length - 1])
        }else if (numericMonth + val > 11){
            setSelectedYear(curr => curr + 1)
            setSelectedMonth(monthsArr[0])
        }else{
            setSelectedMonth(monthsArr[numericMonth + val])
        }

    }
    return (
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-5 gap-4'>
                <button onClick={() => {handleIncrementMonth(-1)}} className='mr-auto text-rose-500 text-lg sm:text-xl hover:opacity-70 '><i className="fa-solid fa-circle-chevron-left"/></button>
                <p className={'col-span-3 text-center text-lg sm:text-xl capitalized textGradient ' + caveat_brush.className}>{selectedMonth}, {selectedYear}</p>
                <button onClick={() => {handleIncrementMonth(1)}} className='ml-auto text-rose-500 text-lg sm:text-xl hover:opacity-70 '><i class="fa-solid fa-circle-chevron-right"/></button>
            </div>
            <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
            {[...Array(numRows).keys()].map((row, rowIndex) => {
                return(
                    <div key={rowIndex} className='grid grid-cols-7 gap-1'>
                        {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                            let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                            let dayDisplay = dayIndex > daysInMonth ? false : (row == 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true
                            
                            let isToday = dayIndex == now.getDate()

                            if (!dayDisplay) {
                                return (
                                    <div className='bg-white' key={dayOfWeekIndex}/>
                                )
                            }
                            
                            let color = demo ?
                                gradients.rose[baseRating
                                    [dayIndex]] : 
                                    dayIndex in data ? 
                                    gradients.rose[data[dayIndex]] 
                                    : 'white'

                            return (
                                <div style={{background: color}}
                                className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' 
                                + (isToday ? ' border-rose-700' : ' border-rose-200')
                                + (color === 'white' ? ' bg-rose-400' : ' bg-white')}
                                key={dayOfWeekIndex}>
                                    <p>{dayIndex}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            </div>
        </div>
    )
}
