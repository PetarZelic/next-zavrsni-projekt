"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type FavoriteItem = {
  id: number;
  name: string;
  image?: { medium?: string };
  type: "show" | "episode" | "actor";
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  //dohvat favorita
  useEffect(() => {
    const fetchFavs = async () => {
      const res = await fetch("/api/favorites");
      const favs = await res.json();
      setFavorites(favs);
    };
    fetchFavs();
  }, []);

  const removeFavorite = async (id: number, type: string) => {
    await fetch("/api/favorites", {
      method: "DELETE",
      body: JSON.stringify({ id, type }),
    });
    setFavorites((prev) => prev.filter((f) => !(f.id === id && f.type === type)));
  };

  const getLinkHref = (fav: FavoriteItem) => {
    switch (fav.type) {
      case "show":
        return `/shows/${fav.id}`;
      case "episode":
        return `/episodes/${fav.id}`;
      case "actor":
        return `/actors/${fav.id}`;
      default:
        return "#";
    }
  };
  //grupiranje favorita po tipu
  const grouped = {
    actor: favorites.filter((f) => f.type === "actor"),
    show: favorites.filter((f) => f.type === "show"),
    episode: favorites.filter((f) => f.type === "episode"),
  };
// prikaz favorita ovisno o tipu
  const renderGroup = (items: FavoriteItem[], label: string) => (
    <>
      {items.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4 border-b pb-1">{label}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map((fav) => (
              <div
                key={`${fav.type}-${fav.id}`}
                className="border p-4 rounded shadow text-center hover:shadow-md transition"
              >
                <Link href={getLinkHref(fav)}>
                  {fav.image?.medium ? (
                    <Image
                      src={fav.image.medium}
                      alt={fav.name}
                      width={150}
                      height={200}
                      className="mx-auto rounded mb-2 object-cover"
                    />
                  ) : (
                    <div className="w-[150px] h-[200px] flex items-center justify-center bg-gray-100 text-gray-500 text-sm mx-auto mb-2">
                      Nema slike
                    </div>
                  )}
                  <h3 className="font-semibold">{fav.name}</h3>
                </Link>
                <button
                  onClick={() => removeFavorite(fav.id, fav.type)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Ukloni
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Favoriti</h1>

      {favorites.length === 0 ? (
        <p className=" italic">Nema favorita još.</p>
      ) : (
        <>
        {/* prikaz grupa*/}
          {renderGroup(grouped.show, "Serije")}
          {renderGroup(grouped.episode, "Epizode")}
          {renderGroup(grouped.actor, "Glumci")}
        </>
      )}
    </div>
  );
}
