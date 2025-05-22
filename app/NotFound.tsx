import Link from "next/link";

export default function NotFound() {
 return (
 <div className='flex flex-col items-center justify-center min-h-[50vh] p-6  rounded-md shadow-md text-center mx-auto max-w-xl'>
 <h2 className='text-2xl font-semibold  mb-2'>
 Show ne postoji
 </h2>
 <p className='text-gray-600 mb-4'>
 Nažalost, traženi Show ne postoji. Provjerite jeste li dobro upisali
 adresu.
 </p>
 <Link
 href='/'
 className='text-blue-600 underline hover:text-blue-800 transition-colors'
 >
 ...ili se vratite na početnu stranicu
 </Link>
 </div>
 );
}
