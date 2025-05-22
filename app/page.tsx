import { Suspense } from 'react';
import ShowList from './components/ShowList';



export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || '1');
 


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">TV Shows (Page {page})</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowList page={page} />
      </Suspense>
    </div>
  );
}