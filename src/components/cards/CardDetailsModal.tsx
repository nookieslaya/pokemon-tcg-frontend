import type { Card } from "../../types/pokemon";

type CardDetailsModalProps = {
  card: Card | null;
  onClose: () => void;
};

const CardDetailsModal = ({ card, onClose }: CardDetailsModalProps) => {
  if (!card) return null;

  const details = [
    { label: "Set", value: card.set?.name },
    { label: "Series", value: card.set?.series },
    { label: "Release", value: card.set?.releaseDate },
    { label: "Rarity", value: card.rarity },
    { label: "HP", value: card.hp },
    { label: "Types", value: (card.types || []).join(", ") },
    { label: "Subtypes", value: (card.subtypes || []).join(", ") },
    { label: "Supertype", value: card.supertype },
    { label: "Artist", value: card.artist },
  ].filter((row) => row.value);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/70"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[95vw] rounded-[28px] border border-slate-700/60 bg-slate-950/90 p-4 shadow-2xl max-h-[90vh] overflow-y-auto sm:max-w-5xl sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-teal-200/80">
              Card details
            </p>
            <h3 className="display-font text-2xl text-white">{card.name}</h3>
          </div>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex items-center justify-center rounded-3xl bg-slate-900/60 p-4">
            {card.images?.large || card.images?.small ? (
              <img
                src={card.images?.large || card.images?.small}
                alt={card.name}
                className="max-h-[520px] w-full rounded-2xl object-contain"
              />
            ) : (
              <div className="flex h-80 items-center justify-center text-sm text-slate-400">
                Image unavailable
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="panel px-4 py-4">
              <h4 className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Card info
              </h4>
              <table className="mt-4 w-full text-sm text-slate-200">
                <tbody>
                  {details.map((row) => (
                    <tr key={row.label} className="border-b border-slate-800/60">
                      <td className="py-2 pr-4 text-slate-400">{row.label}</td>
                      <td className="py-2 text-white">{row.value}</td>
                    </tr>
                  ))}
                  {details.length === 0 && (
                    <tr>
                      <td className="py-2 text-slate-400" colSpan={2}>
                        No details available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal;
