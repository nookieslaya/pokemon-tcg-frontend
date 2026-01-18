type SearchPanelProps = {
  name: string;
  type: string;
  setName: string;
  rarity: string;
  pageSize: number;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSetNameChange: (value: string) => void;
  onRarityChange: (value: string) => void;
  onPageSizeChange: (value: number) => void;
  onSearch: () => void;
  onReset: () => void;
};

const SearchPanel = ({
  name,
  type,
  setName,
  rarity,
  pageSize,
  isLoading,
  onNameChange,
  onTypeChange,
  onSetNameChange,
  onRarityChange,
  onPageSizeChange,
  onSearch,
  onReset,
}: SearchPanelProps) => {
  return (
    <section className="panel space-y-5 px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="display-font text-2xl">Card search</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          Name
          <input
            className="field"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Gardevoir"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          Type
          <input
            className="field"
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            placeholder="Psychic / Fire / Water"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          Set
          <input
            className="field"
            value={setName}
            onChange={(event) => onSetNameChange(event.target.value)}
            placeholder="Base / Fusion Strike"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          Rarity
          <input
            className="field"
            value={rarity}
            onChange={(event) => onRarityChange(event.target.value)}
            placeholder="Rare / Rare Holo"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="space-y-2 text-sm text-slate-200">
          Results per page
          <input
            className="field"
            type="number"
            min={6}
            max={60}
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          />
        </label>
        <div className="flex flex-wrap items-end gap-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSearch}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchPanel;
