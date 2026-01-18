import type { Card } from "../../types/pokemon";

type CardTileProps = {
  card: Card;
  actionLabel: string;
  onAction: (card: Card) => void;
  onSelect: (card: Card) => void;
  actionDisabled?: boolean;
  isWishlisted?: boolean;
  onToggleWishlist?: (card: Card) => void;
  lockWishlistWhenActive?: boolean;
};

const CardTile = ({
  card,
  actionLabel,
  onAction,
  onSelect,
  actionDisabled = false,
  isWishlisted = false,
  onToggleWishlist,
  lockWishlistWhenActive = false,
}: CardTileProps) => {
  const isWishlistLocked = lockWishlistWhenActive && isWishlisted;

  return (
    <article className="card-tile flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-lg text-white">{card.name}</h4>
          <p className="text-xs text-slate-300">
            {card.set?.name || "Unknown set"}
            {card.rarity ? ` - ${card.rarity}` : ""}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {onToggleWishlist && (
            <button
              type="button"
              className={`rounded-full border px-2 py-1 text-xs ${
                isWishlisted
                  ? "border-amber-300/80 text-amber-200"
                  : "border-slate-600/70 text-slate-300"
              } ${isWishlistLocked ? "opacity-70" : ""}`}
              onClick={() => onToggleWishlist(card)}
              disabled={isWishlistLocked}
              aria-pressed={isWishlisted}
              aria-label={
                isWishlistLocked
                  ? "Already in wishlist"
                  : isWishlisted
                  ? "Remove from wl"
                  : "Add to wishlist"
              }
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill={isWishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          )}
          {/* <span className="chip chip-outline">
            {card.hp ? `HP ${card.hp}` : "HP ?"}
          </span> */}
        </div>
      </div>
      <button
        type="button"
        className="mt-auto flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-900/60 p-3"
        onClick={() => onSelect(card)}
      >
        {card.images?.small ? (
          <img
            src={card.images.small}
            alt={card.name}
            className="max-h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex h-64 items-center justify-center text-xs text-slate-400">
            Image unavailable
          </div>
        )}
      </button>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
        {(card.types || []).slice(0, 2).map((typeName) => (
          <span key={typeName} className="chip chip-accent">
            {typeName}
          </span>
        ))}
        {(card.subtypes || []).slice(0, 2).map((subtype) => (
          <span key={subtype} className="chip chip-outline">
            {subtype}
          </span>
        ))}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-1">
        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={() => onAction(card)}
          disabled={actionDisabled}
        >
          {actionLabel}
        </button>
        {/* <button
          type="button"
          className="btn btn-ghost w-full"
          onClick={() => onSelect(card)}
        >
          Details
        </button> */}
      </div>
    </article>
  );
};

export default CardTile;
