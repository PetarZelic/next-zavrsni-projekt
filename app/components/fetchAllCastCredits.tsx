export default async function fetchAllCastCredits(actorID: string) {
  try {
    const res = await fetch(`https://api.tvmaze.com/people/${actorID}/castcredits?embed=show`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Greška pri dohvaćanju uloga:", error);
    return [];
  }
}
