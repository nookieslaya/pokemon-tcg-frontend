import type { Card } from "../types/pokemon";

const fetchWishlist = async (baseUrl: string, token: string) => {
  const response = await fetch(`${baseUrl}/api/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to load wishlist");
  }

  const data = (await response.json()) as { cards: Card[] };
  return data.cards;
};

const addToWishlist = async (baseUrl: string, token: string, card: Card) => {
  const response = await fetch(`${baseUrl}/api/wishlist`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ card }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error || "Failed to save wishlist");
  }
};

const removeFromWishlist = async (
  baseUrl: string,
  token: string,
  cardId: string
) => {
  const response = await fetch(
    `${baseUrl}/api/wishlist/${encodeURIComponent(cardId)}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok && response.status !== 204) {
    throw new Error("Failed to remove from wishlist");
  }
};

export { addToWishlist, fetchWishlist, removeFromWishlist };
