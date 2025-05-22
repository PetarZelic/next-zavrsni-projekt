
import Image from "next/image";
import Link from "next/link";
import notFound from "@/app/NotFound";
import FavoriteButton from "@/app/components/FavoriteButton";




export default async function EpisodeInfo({ params }: { params: { epID: string } }) {

    const epID = params.epID;
    //dohvat episode
    const epRes = await fetch(`https://api.tvmaze.com/episodes/${epID}`);
    if (!epRes.ok) {
        notFound();
    }
    const episode = await epRes.json();

    const castRes = await fetch(`https://api.tvmaze.com/episodes/${epID}/guestcast`);
    const rawCast = await castRes.json();
    const groupedCast: {
        [personId: number]: {
            person: any;
            roles: string[];
        };
    } = {};

    rawCast.forEach((entry: any) => {
        const personId = entry.person.id;
        if (!groupedCast[personId]) {
            groupedCast[personId] = {
                person: entry.person,
                roles: [],
            };
        }
        if (entry.character?.name) {
            groupedCast[personId].roles.push(entry.character.name);
        }
    });

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Episode Info */}
            <div className="flex flex-col items-center text-center mb-10">
                <h1 className="text-3xl font-bold mb-4">{episode.name}</h1>

                {episode.image?.medium ? (
                    <Image
                        src={episode.image.medium}
                        width={300}
                        height={300}
                        alt={episode.name}
                        className="rounded-lg shadow-md"
                    />
                ) : (
                    <div className="w-[300px] h-[300px] flex items-center justify-center  text-gray-600 italic rounded-lg">
                        Nema slike
                    </div>
                )}

                <p className="mt-4 text-lg">
                    <span className="font-semibold">Ocjena:</span>{" "}
                    {episode.rating?.average ? `${episode.rating.average}/10` : "N/A"}
                </p>

                <div
                    className="mt-4  max-w-xl"
                    dangerouslySetInnerHTML={{ __html: episode.summary }}
                />
                <div><FavoriteButton
                item={{
                    id: episode.id,
                    name: episode.name,
                    image: episode.image,
                    type: "episode",
                }}
            />
            </div>
            </div>
            

            {/* Cast Info */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">🎭 Gostujući glumci</h2>


                {Object.values(groupedCast).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {Object.values(groupedCast).map((actor: any) => (
                            <Link
                                href={`/actors/${actor.person.id}`}
                                key={actor.person.id}
                                className="flex flex-col items-center text-center border p-4  shadow hover:shadow-md transition"
                            >
                                <Image
                                    src={actor.person.image?.medium }
                                    width={150}
                                    height={150}
                                    alt={actor.person.name}
                                    priority
                                    className=" mb-2"
                                />
                                <p className="font-medium">{actor.person.name}</p>
                                <p className="text-sm text-[#AE445A] italic">
                                    kao {actor.roles.join(", ")}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className=" italic">Nema gostujućih glumaca za ovu epizodu.</p>
                )}

            </div>
        </div>
    );
}
