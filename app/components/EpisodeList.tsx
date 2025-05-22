import EpisodeListClient from './EpisodeListClient';

export default async function EpisodeList({ showID }: { showID: string | number }) {
  try {
    const seasonRes = await fetch(`https://api.tvmaze.com/shows/${showID}/seasons`, {
      
    });

    if (!seasonRes.ok) throw new Error("Failed to fetch seasons");

    const seasonData = await seasonRes.json();
    
    console.log("Sezone dohvacene:", seasonData.length);

    const seasonsWithEpisodes = await Promise.all(
  seasonData.map(async (season: any) => {
    if (!season.id) {
      console.warn("Season bez ID-a:", season);
      return null; // preskoci nevazece sezonske podatke
    }
    //dohvat episoda po sezoni
    const epRes = await fetch(`https://api.tvmaze.com/seasons/${season.id}/episodes`, {
      cache:"no-store"
    });

    if (!epRes.ok) throw new Error("Failed to fetch episodes");
    //spremanje episoda i sezona
    const episodes = await epRes.json();
    return { ...season, episodes };
  })
);



  const validSeasons = seasonsWithEpisodes.filter(Boolean);
return <EpisodeListClient seasons={validSeasons}  />;


    
    
  } catch (error) {
    console.error("Fetch error:", error);
    return <p>Greška pri dohvaćanju podataka.</p>;
  }
}
