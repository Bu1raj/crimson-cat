import { Caveat_Brush } from 'next/font/google';
import React from 'react'
const caveat_brush = Caveat_Brush({ subsets: ["latin"], weight:['400']});

export default function Button(props) {
    const {text, dark, full, clickHandler} = props;

    return (
        <button
        onClick={clickHandler}
        className=
        {
            'rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-[#FF4C4C] '+
            (dark ? ' text-white bg-[#FF4C4C]' : ' text-[#FF4C4C] ' ) + 
            (full ? ' grid place-items-center w-full ' : ' ')
        }>
            <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + caveat_brush.className}>{text}</p>
        </button>
    )
}
