"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
 const router = useRouter();

 function handleClick() {
 router.back();
 }

 return (
 <button
 onClick={handleClick}
 className='bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md transition-colors'
 >
 Back
 </button>
 );
}
