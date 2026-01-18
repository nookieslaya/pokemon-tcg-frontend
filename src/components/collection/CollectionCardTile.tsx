import { useEffect, useState } from "react";
import type { CollectionCard } from "../../types/pokemon";

type CollectionCardTileProps = {
  card: CollectionCard;
  onRemove: (card: CollectionCard) => void;
  onSelect: (card: CollectionCard) => void;
  onQuantityChange: (card: CollectionCard, quantity: number) => void;
};

const CollectionCardTile = ({
  card,
  onRemove,
  onSelect,
  onQuantityChange,
}: CollectionCardTileProps) => {
  const [quantity, setQuantity] = useState(card.quantity);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setQuantity(card.quantity);
  }, [card.quantity]);

  const normalizeQuantity = (value: number) => {
    const safeValue = Number.isFinite(value) ? value : card.quantity;
    return Math.max(1, Math.floor(safeValue));
  };

  const handleSaveQuantity = () => {
    const safe = normalizeQuantity(quantity);
    setQuantity(safe);
    onQuantityChange(card, safe);
    setIsEditing(false);
  };

  return (
    <article className="card-tile">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-lg text-white">{card.name}</h4>
          <p className="text-xs text-slate-300">
            {card.set?.name || "Unknown set"}
            {card.rarity ? ` - ${card.rarity}` : ""}
          </p>
        </div>
        {/* <span className="chip chip-outline">
          {card.hp ? `HP ${card.hp}` : "HP ?"}
        </span> */}
      </div>
      <button
        type="button"
        className="mt-4 flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-900/60 p-3"
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
      <div className="mt-4 grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl py-1">
          <span className="text-xs uppercase tracking-[0.2em]  bg-yellow-300/40 !px-3 !py-2 ">
            Quantity: {card.quantity}
          </span>
          <button
            type="button"
            className="btn btn-ghost !px-3 !py-2 "
            onClick={() => {
              setQuantity(card.quantity);
              setIsEditing((prev) => !prev);
            }}
          >
            <span className="text-xs">{isEditing ? "Cancel" : "Edit"}</span>
          </button>
        </div>

        {isEditing && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/50 px-3 py-3">
            <div className="flex items-center justify-between gap-2 w-full">
              <button
                type="button"
                className="btn btn-ghost rounded-2xl !py-1 !px-2"
                onClick={() =>
                  setQuantity((value) => normalizeQuantity(value - 1))
                }
              >
                -
              </button>
              <input
                className="field field-compact rounded-2xl !py-1 !px-1"
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />
              <button
                type="button"
                className="btn btn-ghost rounded-2xl !py-1 !px-2"
                onClick={() =>
                  setQuantity((value) => normalizeQuantity(value + 1))
                }
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleSaveQuantity}
            >
              Save quantity
            </button>
          </div>
        )}

        <div className="grid gap-2 sm:grid-cols-1">
          {/* <button type="button" className="btn btn-primary" onClick={() => onSelect(card)}>
            Details
          </button> */}
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onRemove(card)}
          >
            Remove card
          </button>
        </div>
      </div>
    </article>
  );
};

export default CollectionCardTile;
