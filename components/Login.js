'use client'
import { Caveat_Brush } from 'next/font/google';
import React, {useState} from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

const caveat_brush = Caveat_Brush({ subsets: ["latin"], weight:['400']});
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const {signup, login} = useAuth()

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return
    }

    setIsAuthenticating(true)
    try{
      if (isRegister){
        console.log('signing up')
        await signup(email, password)
      }else{
        console.log('logging in')
        await login(email, password)
      }
    }catch(e){
      console.log(e.message)
    }finally{
      setIsAuthenticating(false)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3
      className={'text-4xl sm:text-5xl md:text-6xl ' + caveat_brush.className}>
        {isRegister ? 'Register' : 'Login'}
      </h3>

      <p className=''>You&#39;re one step away !</p>
      <input value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-[#ff0000] focus:border-[#ff0000] py-2 sm:py-3 border border-solid border-[#FF4C4C] rounded-full outline-none ' placeholder='Email' type='email'/>
      <input value={password} onChange={(p) => {
        setPassword(p.target.value)
      }} className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-[#ff0000] focus:border-[#ff0000] py-2 sm:py-3 border border-solid border-[#FF4C4C] rounded-full outline-none ' placeholder='Password' type='password'/>
      <div className='max-w-[400px] w-full mx-auto '>
        <Button clickHandler={handleSubmit} text={isAuthenticating ? 'Submitting' : 'Submit'} full/>
      </div>
      <p className='text-center'>
        {isRegister ?
        'Already have an account? ' : 'Don\'t have an account? '}
        <button onClick={() => setIsRegister(!isRegister)} className='text-[#FF4C4C]'> {isRegister ? ' Sign in' : ' Register'} </button>
      </p>
    </div>
  )
}
