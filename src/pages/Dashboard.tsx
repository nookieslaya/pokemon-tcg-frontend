import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import AuthPanel from "../components/auth/AuthPanel";
import CardsGrid from "../components/cards/CardsGrid";
import CardDetailsModal from "../components/cards/CardDetailsModal";
import CollectionPanel from "../components/collection/CollectionPanel";
import CollectionView from "../components/collection/CollectionView";
import LibraryTabs from "../components/collection/LibraryTabs";
import Header from "../components/layout/Header";
import SearchPanel from "../components/search/SearchPanel";
import WishlistView from "../components/wishlist/WishlistView";
import { fetchPokemonCards } from "../api/pokemon";
import {
  addToCollection,
  fetchCollection,
  removeFromCollection,
  updateCollectionQuantity,
} from "../api/collection";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../api/wishlist";
import { useAuth } from "../hooks/useAuth";
import { buildPokemonQuery } from "../lib/pokemonQuery";
import type { Card, CollectionCard } from "../types/pokemon";

const apiBase =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  (import.meta.env.DEV ? "http://localhost:3000" : "");
const apiKey = import.meta.env.VITE_POKEMON_API_KEY as string | undefined;

const Dashboard = () => {
  const auth = useAuth(apiBase);

  const [name, setName] = useState("pikachu");
  const [type, setType] = useState("");
  const [setNameFilter, setSetNameFilter] = useState("");
  const [rarity, setRarity] = useState("");
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(1);

  const [cards, setCards] = useState<Card[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [collection, setCollection] = useState<CollectionCard[]>([]);
  const [wishlist, setWishlist] = useState<Card[]>([]);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [view, setView] = useState<"browse" | "collection" | "wishlist">(
    "browse"
  );
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const lastAuthError = useRef("");
  const lastSearchError = useRef("");

  const builderQuery = useMemo(
    () =>
      buildPokemonQuery({
        name,
        type,
        setName: setNameFilter,
        rarity,
      }),
    [name, rarity, setNameFilter, type]
  );

  const activeQuery = builderQuery;

  const fetchCards = useCallback(
    async (nextPage: number) => {
      setIsLoading(true);
      setSearchError("");
      try {
        const data = await fetchPokemonCards({
          query: activeQuery,
          page: nextPage,
          pageSize,
          apiKey,
        });
        setCards(data.cards);
        setTotal(data.total);
        setPage(nextPage);
      } catch (error) {
        setSearchError(
          error instanceof Error ? error.message : "Failed to load cards"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [activeQuery, apiKey, pageSize]
  );

  useEffect(() => {
    void fetchCards(1);
  }, [fetchCards]);

  useEffect(() => {
    if (!auth.error) {
      lastAuthError.current = "";
      return;
    }
    if (auth.error !== lastAuthError.current) {
      toast.error(auth.error);
      lastAuthError.current = auth.error;
    }
  }, [auth.error]);

  useEffect(() => {
    if (!searchError) {
      lastSearchError.current = "";
      return;
    }
    if (searchError !== lastSearchError.current) {
      toast.error(searchError);
      lastSearchError.current = searchError;
    }
  }, [searchError]);

  const loadCollection = useCallback(
    async (options?: { silent?: boolean }) => {
      if (!auth.token) {
        if (!options?.silent) {
          auth.setError("Log in to view your collection.");
        }
        return;
      }
      setCollectionLoading(true);
      try {
        const items = await fetchCollection(apiBase, auth.token);
        setCollection(items);
      } catch (error) {
        auth.setError(
          error instanceof Error ? error.message : "Collection error"
        );
      } finally {
        setCollectionLoading(false);
      }
    },
    [apiBase, auth.setError, auth.token]
  );

  useEffect(() => {
    if (!auth.token) {
      setCollection([]);
      setWishlist([]);
      setView("browse");
      return;
    }
    void loadCollection({ silent: true });
  }, [auth.token, loadCollection]);

  const loadWishlist = useCallback(
    async (options?: { silent?: boolean }) => {
      if (!auth.token) {
        if (!options?.silent) {
          auth.setError("Log in to view your wishlist.");
        }
        return;
      }
      setWishlistLoading(true);
      try {
        const items = await fetchWishlist(apiBase, auth.token);
        setWishlist(items);
      } catch (error) {
        auth.setError(
          error instanceof Error ? error.message : "Wishlist error"
        );
      } finally {
        setWishlistLoading(false);
      }
    },
    [apiBase, auth.setError, auth.token]
  );

  useEffect(() => {
    if (!auth.token) {
      setWishlist([]);
      return;
    }
    void loadWishlist({ silent: true });
  }, [auth.token, loadWishlist]);

  useEffect(() => {
    if (view === "wishlist" && auth.token) {
      void loadWishlist({ silent: true });
    }
  }, [auth.token, loadWishlist, view]);

  const wishlistIds = useMemo(
    () => new Set(wishlist.map((card) => card.id)),
    [wishlist]
  );
  const collectionIds = useMemo(
    () => new Set(collection.map((card) => card.id)),
    [collection]
  );

  const handleAddToCollection = async (card: Card) => {
    if (!auth.token) {
      auth.setError("Log in to save to your collection.");
      return;
    }
    if (collectionIds.has(card.id)) {
      return;
    }
    try {
      await addToCollection(apiBase, auth.token, card);
      setCollection((prev) => {
        const existing = prev.find((item) => item.id === card.id);
        if (existing) {
          return prev.map((item) =>
            item.id === card.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [{ ...card, quantity: 1 }, ...prev];
      });
      toast.success(`Added ${card.name} to collection`);
    } catch (error) {
      auth.setError(error instanceof Error ? error.message : "Save error");
    }
  };

  const handleRemoveFromCollection = async (card: CollectionCard) => {
    if (!auth.token) return;
    try {
      await removeFromCollection(apiBase, auth.token, card.id);
      setCollection((prev) => prev.filter((item) => item.id !== card.id));
      toast.success(`Removed ${card.name} from collection`);
    } catch (error) {
      auth.setError(error instanceof Error ? error.message : "Remove error");
    }
  };

  const handleQuantityChange = async (
    card: CollectionCard,
    nextQuantity: number
  ) => {
    if (!auth.token) return;
    const safeQuantity = Math.max(1, Math.floor(nextQuantity));
    try {
      await updateCollectionQuantity(
        apiBase,
        auth.token,
        card.id,
        safeQuantity
      );
      setCollection((prev) =>
        prev.map((item) =>
          item.id === card.id ? { ...item, quantity: safeQuantity } : item
        )
      );
      toast.success(`Updated quantity for ${card.name}`);
    } catch (error) {
      auth.setError(
        error instanceof Error ? error.message : "Quantity update error"
      );
      void loadCollection({ silent: true });
    }
  };

  const handleToggleWishlist = async (card: Card) => {
    if (!auth.token) {
      auth.setError("Log in to add to wishlist.");
      return;
    }
    try {
      if (wishlistIds.has(card.id)) {
        await removeFromWishlist(apiBase, auth.token, card.id);
        setWishlist((prev) => prev.filter((item) => item.id !== card.id));
        toast.success(`Removed ${card.name} from wishlist`);
      } else {
        await addToWishlist(apiBase, auth.token, card);
        setWishlist((prev) => [card, ...prev]);
        toast.success(`Added ${card.name} to wishlist`);
      }
    } catch (error) {
      auth.setError(error instanceof Error ? error.message : "Wishlist error");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const collectionCount = collection.reduce(
    (sum, card) => sum + (card.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen px-5 pb-16 pt-10 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <Header activeQuery={activeQuery} total={total} />

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-6">
            <AuthPanel
              mode={authMode}
              onModeChange={setAuthMode}
              user={auth.user}
              loading={auth.loading}
              error={auth.error}
              onLogin={auth.login}
              onRegister={auth.register}
              onLogout={auth.logout}
              onClearError={auth.clearError}
            />
            <CollectionPanel
              count={collectionCount}
              wishlistCount={wishlist.length}
              onOpenCollection={() => {
                if (!auth.token) {
                  auth.setError("Log in to view your collection.");
                  return;
                }
                setView("collection");
                void loadCollection();
              }}
              onOpenWishlist={() => {
                if (!auth.token) {
                  auth.setError("Log in to view your wishlist.");
                  return;
                }
                setView("wishlist");
                void loadWishlist();
              }}
            />
          </aside>

          <main className="flex flex-col gap-6">
            {view === "browse" ? (
              <>
                <SearchPanel
                  name={name}
                  type={type}
                  setName={setNameFilter}
                  rarity={rarity}
                  pageSize={pageSize}
                  isLoading={isLoading}
                  onNameChange={setName}
                  onTypeChange={setType}
                  onSetNameChange={setSetNameFilter}
                  onRarityChange={setRarity}
                  onPageSizeChange={setPageSize}
                  onSearch={() => fetchCards(1)}
                  onReset={() => {
                    setType("");
                    setName("");
                    setSetNameFilter("");
                    setRarity("");
                  }}
                />
                <CardsGrid
                  cards={cards}
                  isLoading={isLoading}
                  error={searchError}
                  page={page}
                  totalPages={totalPages}
                  activeQuery={activeQuery}
                  onPageChange={fetchCards}
                  onAdd={handleAddToCollection}
                  onSelect={setSelectedCard}
                  collectionIds={collectionIds}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                />
              </>
            ) : (
              <>
                <LibraryTabs
                  active={view === "wishlist" ? "wishlist" : "collection"}
                  onChange={(tab) => setView(tab)}
                />
                {view === "collection" ? (
                  <CollectionView
                    cards={collection}
                    isLoading={collectionLoading}
                    onBack={() => setView("browse")}
                    onRemove={handleRemoveFromCollection}
                    onQuantityChange={handleQuantityChange}
                    onSelect={setSelectedCard}
                  />
                ) : (
                  <WishlistView
                    cards={wishlist}
                    isLoading={wishlistLoading}
                    onBack={() => setView("browse")}
                    onRemove={(card) => handleToggleWishlist(card)}
                    onSelect={setSelectedCard}
                    onToggleWishlist={handleToggleWishlist}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
      <CardDetailsModal
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
};

export default Dashboard;
