type LibraryTabsProps = {
  active: "collection" | "wishlist";
  onChange: (tab: "collection" | "wishlist") => void;
};

const LibraryTabs = ({ active, onChange }: LibraryTabsProps) => {
  return (
    <div className="panel flex w-full gap-2 p-2 sm:max-w-md">
      <button
        type="button"
        className={`tab ${active === "collection" ? "tab-active" : ""}`}
        onClick={() => onChange("collection")}
      >
        Collection
      </button>
      <button
        type="button"
        className={`tab ${active === "wishlist" ? "tab-active" : ""}`}
        onClick={() => onChange("wishlist")}
      >
        Wishlist
      </button>
    </div>
  );
};

export default LibraryTabs;
