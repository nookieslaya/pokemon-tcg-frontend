import CollectionCardTile from "./CollectionCardTile";
import type { CollectionCard } from "../../types/pokemon";

type CollectionViewProps = {
  cards: CollectionCard[];
  isLoading: boolean;
  onBack: () => void;
  onRemove: (card: CollectionCard) => void;
  onSelect: (card: CollectionCard) => void;
  onQuantityChange: (card: CollectionCard, quantity: number) => void;
};

const CollectionView = ({
  cards,
  isLoading,
  onBack,
  onRemove,
  onSelect,
  onQuantityChange,
}: CollectionViewProps) => {
  return (
    <section className="panel px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-200/80">
            Saved collection
          </p>
          <h2 className="display-font text-2xl text-white">
            All cards ({cards.reduce((sum, card) => sum + card.quantity, 0)})
          </h2>
        </div>
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          Back to search
        </button>
      </div>

      {isLoading && (
        <p className="mt-4 text-sm text-slate-300">Loading collection...</p>
      )}

      {!isLoading && cards.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-700/60 p-8 text-center text-sm text-slate-300">
          No saved cards yet. Go back and add some to your collection.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <CollectionCardTile
            key={card.id}
            card={card}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default CollectionView;
