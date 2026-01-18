import type { Card, CollectionCard } from "../types/pokemon";

const fetchCollection = async (baseUrl: string, token: string) => {
  const response = await fetch(`${baseUrl}/api/collection`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to load collection");
  }

  const data = (await response.json()) as { cards: CollectionCard[] };
  return data.cards;
};

const addToCollection = async (baseUrl: string, token: string, card: Card) => {
  const response = await fetch(`${baseUrl}/api/collection`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ card }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error || "Failed to save card");
  }
};

const updateCollectionQuantity = async (
  baseUrl: string,
  token: string,
  cardId: string,
  quantity: number
) => {
  const response = await fetch(
    `${baseUrl}/api/collection/${encodeURIComponent(cardId)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    }
  );

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error || "Failed to update quantity");
  }
};

const removeFromCollection = async (
  baseUrl: string,
  token: string,
  cardId: string
) => {
  const response = await fetch(
    `${baseUrl}/api/collection/${encodeURIComponent(cardId)}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok && response.status !== 204) {
    throw new Error("Failed to remove card");
  }
};

export {
  addToCollection,
  fetchCollection,
  removeFromCollection,
  updateCollectionQuantity,
};
