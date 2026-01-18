import type { Card } from "../types/pokemon";

type FetchCardsParams = {
  query: string;
  page: number;
  pageSize: number;
  apiKey?: string;
};

type CardsResponse = {
  cards: Card[];
  total: number;
};

const fetchPokemonCards = async ({
  query,
  page,
  pageSize,
  apiKey,
}: FetchCardsParams): Promise<CardsResponse> => {
  const url = new URL("https://api.pokemontcg.io/v2/cards");
  if (query.trim()) {
    url.searchParams.set("q", query);
  }
  url.searchParams.set("page", String(page));
  url.searchParams.set("pageSize", String(pageSize));

  const headers: Record<string, string> = {};
  if (apiKey) {
    headers["X-Api-Key"] = apiKey;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error("Pokemon TCG API error");
  }
  const data = await response.json();
  return {
    cards: data.data || [],
    total: data.totalCount || 0,
  };
};

export { fetchPokemonCards };
