'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

type SeasonProps = {
  seasons: {
    id: number;
    number: number;
    episodes: { id: number; name: string }[];
  }[];
};

export default function EpisodeListClient({ seasons }: SeasonProps) {
  const [openSeasons, setOpenSeasons] = useState<number[]>([]);
  //dohvat sezona serije
  const toggleSeason = (id: number) => {
    setOpenSeasons((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {seasons.map((season) => {
        const isOpen = openSeasons.includes(season.id);
        return (
          <div key={season.id} className="mb-4">
            <div
              onClick={() => toggleSeason(season.id)}
              className="flex items-center gap-2 cursor-pointer hover:underline"
            >
              <h2 className="text-lg font-semibold">Season {season.number}</h2>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 transition-transform" />
              ) : (
                <ChevronDown className="w-5 h-5 transition-transform" />
              )}
            </div>
              {/*ako je otvorena sezona prikazi episode */}
            {isOpen && (
              <ul className="mt-2 ml-4 list-disc">
                {season.episodes.map((ep) => (

                  <li key={ep.id}>
                    <Link href={`/episode/${ep.id}`}>{ep.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
