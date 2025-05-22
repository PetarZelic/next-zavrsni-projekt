"use client";
import { useState, useEffect } from "react";

type FavoriteItem = {
  id: number;
  name: string;
  image?: { medium?: string };
  type: 'show' | 'episode' | 'actor';
};

type Props = {
  item: FavoriteItem;
};

export default function FavoriteButton({ item }: Props) {
  const [isFav, setIsFav] = useState(false);
//provjera favorita
  useEffect(() => {
    const checkFav = async () => {
      const res = await fetch("/api/favorites");
      const favs = await res.json();
      setIsFav(favs.some((f: any) => f.id === item.id && f.type === item.type));
    };
    if (item) checkFav();
  }, [item]);

  //dodavanje ili brisanje favorita
  const toggleFavorite = async () => {
    if (!item) return;

    if (isFav) {
      await fetch("/api/favorites", {
        method: "DELETE",
        body: JSON.stringify({ id: item.id, type: item.type }),
      });
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify(item),
      });
    }

    setIsFav(!isFav);
  };

  if (!item) return null;

  return (
    <button
      onClick={toggleFavorite}
      className={`mt-4 px-4 py-2 rounded text-white ${
        isFav ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      {isFav ? "Ukloni iz favorita" : "Dodaj u favorite"}
    </button>
  );
}
