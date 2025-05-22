export default async function fetchAllShows(maxPages = 10) {
  //dohvacanje url-ova vise pageova
  const pageUrls = Array.from({ length: maxPages }, (_, i) =>
    `https://api.tvmaze.com/shows?page=${i}`
  );

  try {
    const responses = await Promise.all(
      pageUrls.map(url => fetch(url).then(res => res.json()))
    );

    // zaustavi na prvoj praznoj stranici i spoji samo rezultate do tamo
    const allShows = [];
    for (const show of responses) {
      if (!show.length) break;
      allShows.push(...show);
    }


    return allShows;
  } catch (error) {
    console.error("Greška pri paralelnom dohvaćanju uloga:", error);
    return [];
  }
}