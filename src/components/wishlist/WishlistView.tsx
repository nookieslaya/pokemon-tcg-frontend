import CardTile from "../cards/CardTile";
import type { Card } from "../../types/pokemon";

type WishlistViewProps = {
  cards: Card[];
  isLoading: boolean;
  onBack: () => void;
  onRemove: (card: Card) => void;
  onSelect: (card: Card) => void;
  onToggleWishlist: (card: Card) => void;
};

const WishlistView = ({
  cards,
  isLoading,
  onBack,
  onRemove,
  onSelect,
  onToggleWishlist,
}: WishlistViewProps) => {
  return (
    <section className="panel px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-200/80">
            Wishlist
          </p>
          <h2 className="display-font text-2xl text-white">
            Dream cards ({cards.length})
          </h2>
        </div>
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          Back to search
        </button>
      </div>

      {isLoading && (
        <p className="mt-4 text-sm text-slate-300">Loading wishlist...</p>
      )}

      {!isLoading && cards.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-700/60 p-8 text-center text-sm text-slate-300">
          No cards on your wishlist. Add stars from the search view.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <CardTile
            key={card.id}
            card={card}
            actionLabel="Remove from wl"
            onAction={onRemove}
            onSelect={onSelect}
            isWishlisted
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default WishlistView;
