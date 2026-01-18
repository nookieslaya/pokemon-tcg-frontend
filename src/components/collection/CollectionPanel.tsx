type CollectionPanelProps = {
  count: number;
  wishlistCount: number;
  onOpenCollection: () => void;
  onOpenWishlist: () => void;
};

const CollectionPanel = ({
  count,
  wishlistCount,
  onOpenCollection,
  onOpenWishlist,
}: CollectionPanelProps) => {
  return (
    <section className="panel space-y-4 px-5 py-6">
      <h2 className="display-font text-lg">Your collection</h2>
      <div className="rounded-2xl border border-dashed border-slate-600/70 p-4">
        <p className="text-sm text-slate-200">
          {count} cards total in collection
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Wishlist: {wishlistCount} cards
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={onOpenCollection}
          >
            Collection
          </button>
          <button
            type="button"
            className="btn btn-ghost w-full"
            onClick={onOpenWishlist}
          >
            Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollectionPanel;
