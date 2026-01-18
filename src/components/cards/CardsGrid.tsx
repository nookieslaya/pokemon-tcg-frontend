import type { Card } from "../../types/pokemon";
import CardTile from "./CardTile";

type CardsGridProps = {
  cards: Card[];
  isLoading: boolean;
  error: string;
  page: number;
  totalPages: number;
  activeQuery: string;
  onPageChange: (nextPage: number) => void;
  onAdd: (card: Card) => void;
  onSelect: (card: Card) => void;
  collectionIds: Set<string>;
  wishlistIds: Set<string>;
  onToggleWishlist: (card: Card) => void;
};

const CardsGrid = ({
  cards,
  isLoading,
  error,
  page,
  totalPages,
  activeQuery,
  onPageChange,
  onAdd,
  onSelect,
  collectionIds,
  wishlistIds,
  onToggleWishlist,
}: CardsGridProps) => {
  return (
    <section className="panel px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="display-font text-xl">Results</h3>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="chip chip-outline">q={activeQuery || "*"}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1 || isLoading}
        >
          Previous
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages || isLoading}
        >
          Next
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-rose-200">{error}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const isInCollection = collectionIds.has(card.id);
          const isWishlisted = wishlistIds.has(card.id);

          return (
            <CardTile
              key={card.id}
              card={card}
              actionLabel={isInCollection ? "In collection" : "Add to collection"}
              actionDisabled={isInCollection}
              onAction={onAdd}
              onSelect={onSelect}
              isWishlisted={isWishlisted}
              onToggleWishlist={onToggleWishlist}
              lockWishlistWhenActive
            />
          );
        })}
        {cards.length === 0 && !isLoading && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-700/60 p-8 text-center text-sm text-slate-300">
            No results. Adjust filters and try again.
          </div>
        )}
      </div>
    </section>
  );
};

export default CardsGrid;
