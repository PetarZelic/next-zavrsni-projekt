import EpisodeList from "@/app/components/EpisodeList";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/app/components/FavoriteButton";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';



export default async function Show(props: { params: Promise<{ number: string }> }) {
  const params = await props.params;

  const id = parseInt(params.number, 10);
  //dohvat serije s id-jem
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  if (!res.ok) notFound();
  const show = await res.json();
  if (!show?.id) notFound();
  //dohvat glumaca te serije
  const castRes = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
  const cast = await castRes.json();

  //grupiranje uloga po glumcu
  const groupedCast = cast.reduce((acc: any, entry: any) => {
    const { id, name, image } = entry.person;
    if (!acc[id]) acc[id] = { person: { id, name, image }, roles: [] };
    if (entry.character?.name) acc[id].roles.push(entry.character.name);
    return acc;
  }, {});

  return (
    <div className="flex flex-col p-12">
      <div className="flex flex-col items-center border p-12">
        {show.image?.medium && (
          <><Image
            src={show.image.original || show.image.medium}
            alt={show.name}
            width={300}
            height={400}
            priority
            className="mb-4 rounded shadow"
          />
          <h1 className="text-3xl font-bold mb-2">{show.name}</h1>
          </>

        )}
            
            <p className="text-lg mb-4">Rating: {show.rating?.average || "N/A"}</p>
            <div
              className="prose max-w-xl text-justify"
              dangerouslySetInnerHTML={{ __html: show.summary }}
            />
            <FavoriteButton
              item={{
                id: show.id,
                name: show.name,
                image: show.image,
                type: "show",

              }}
            />
          </div>

        <div className="mt-10">
          <EpisodeList showID={show.id} />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Glumci</h2>
          {Object.values(groupedCast).map(({ person, roles }: any) => (
            <Link
              key={person.id}
              href={`/actors/${person.id}`}
              className="flex items-center gap-4 mb-6 hover:bg-gray-100 p-2 rounded transition"
            >
              {person.image?.medium && (
                <Image src={person.image.medium} width={100} height={100} alt={person.name} className="rounded" />
              )}
              <div>
                <p className="text-lg font-semibold">{person.name}</p>
                <p className="italic text-sm ">kao {roles.join(", ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      );
}
