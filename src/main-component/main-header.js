'use client'

import { useState } from "react"
import './style.css';
import Link from 'next/link';
export default function Header() {
  const [showMehu,setShowMenu] =useState(false)
  function allPagesRouter(){
    return(
      <div class="min-h-screen bg-[#101820] text-orange-500 flex flex-col justify-between px-5 py-6">

  <div class="flex items-center gap-2">
   
    
  </div>


  <div class="flex flex-col gap-6 mt-10 all-pages-main-container">
   
    <div class="flex justify-between items-center text-xl font-semibold text-white all-pages-main-container-inner ">
        <Link href="/about">
              
                About
              </Link>
    
      <span class="text-2xl">›</span>
    </div>
    <div class="flex justify-between items-center text-xl font-semibold text-white all-pages-main-container-inner">
       <Link href="/it-inventory-list">
              
                IT Asset Management
              </Link>
   
      <span class="text-2xl">›</span>
    </div> 
    <div class="flex justify-between items-center text-xl font-semibold text-white all-pages-main-container-inner">
      <span>IT Help Desk</span>
      <span class="text-2xl">›</span>
    </div>
    <div class="flex justify-between items-center text-xl font-semibold text-white all-pages-main-container-inner">
      <span>Asset Allocation</span>
      <span class="text-2xl">›</span>
    </div>
    <div class="flex justify-between items-center text-xl font-semibold text-white all-pages-main-container-inner">
 
         <Link href="/employees-list">
              
               Employees Record
              </Link>
      <span class="text-2xl">›</span>
    </div>
  </div>



</div>

    )
  }
  return (
    <header className="bg-black  shadow-md " style={{padding:"30px 0px"}}>
      <div className="max-w-7xl mx-auto flex items-center justify-between  " style={{justifyContent:"space-between", padding:"0px 20px"}}>
        {/* Left: Placeholder for Logo or Menu */}
        <div className="text-black font-bold text-xl">
        {!showMehu &&    <button onClick={()=>setShowMenu(!showMehu)}  style={{height:40,width:60}}>
      
           <svg xmlns="http://www.w3.org/2000/svg" color="#ee7100" fill="white" viewBox="0 0 24 24" stroke-width="1.5px" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg> 
          </button>}
          {showMehu &&     <button onClick={()=>setShowMenu(!showMehu)} style={{height:40,width:60}}>
     <svg xmlns="http://www.w3.org/2000/svg" color="#ee7100"  viewBox="0 0 24 24" fill="#ee7100">
<path  color="#ee7100"  d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#ee7100"/>
</svg>

          </button>}
        </div>

        {/* Center: Title */}
        <div className="text-black text-lg font-semibold">
            <Link href="/">
              <img src={"./logo_gruner_1.png"}/></Link>
     
        </div>
        

        {/* Right: Placeholder for Actions */}
        <div className="text-black text-sm">
           EN 
        </div>
      </div>
     
      {showMehu && allPagesRouter()}
    </header>
  )
}
