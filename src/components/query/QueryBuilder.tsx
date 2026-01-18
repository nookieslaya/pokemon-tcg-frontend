type QueryBuilderProps = {
  name: string;
  type: string;
  subtypeA: string;
  subtypeB: string;
  subtypeMode: "AND" | "OR";
  hpMin: string;
  hpMax: string;
  exclude: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  pageSize: number;
  advancedQuery: string;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSubtypeAChange: (value: string) => void;
  onSubtypeBChange: (value: string) => void;
  onSubtypeModeChange: (value: "AND" | "OR") => void;
  onHpMinChange: (value: string) => void;
  onHpMaxChange: (value: string) => void;
  onExcludeChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: "asc" | "desc") => void;
  onPageSizeChange: (value: number) => void;
  onAdvancedQueryChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
};

const QueryBuilder = ({
  name,
  type,
  subtypeA,
  subtypeB,
  subtypeMode,
  hpMin,
  hpMax,
  exclude,
  sortBy,
  sortOrder,
  pageSize,
  advancedQuery,
  isLoading,
  onNameChange,
  onTypeChange,
  onSubtypeAChange,
  onSubtypeBChange,
  onSubtypeModeChange,
  onHpMinChange,
  onHpMaxChange,
  onExcludeChange,
  onSortByChange,
  onSortOrderChange,
  onPageSizeChange,
  onAdvancedQueryChange,
  onSearch,
  onReset,
}: QueryBuilderProps) => {
  return (
    <section className="panel space-y-5 px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="display-font text-2xl">Card explorer</h2>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="chip chip-outline">Query builder</span>
          <span className="chip chip-outline">Advanced query</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          Name
          <input
            className="field"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          Type (types)
          <input
            className="field"
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            placeholder="Fairy / Psychic / Fire"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          Subtype A
          <input
            className="field"
            value={subtypeA}
            onChange={(event) => onSubtypeAChange(event.target.value)}
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          Subtype B
          <input
            className="field"
            value={subtypeB}
            onChange={(event) => onSubtypeBChange(event.target.value)}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-2 text-sm text-slate-200">
            HP min
            <input
              className="field"
              type="number"
              value={hpMin}
              onChange={(event) => onHpMinChange(event.target.value)}
            />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            HP max
            <input
              className="field"
              type="number"
              value={hpMax}
              onChange={(event) => onHpMaxChange(event.target.value)}
            />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-200">
          Exclude (NOT)
          <input
            className="field"
            value={exclude}
            onChange={(event) => onExcludeChange(event.target.value)}
            placeholder="supertype:Trainer"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          Subtype mode
          <select
            className="field"
            value={subtypeMode}
            onChange={(event) =>
              onSubtypeModeChange(event.target.value as "AND" | "OR")
            }
          >
            <option value="AND">AND (single)</option>
            <option value="OR">OR (A or B)</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
        <label className="space-y-2 text-sm text-slate-200">
          Sort by
          <select
            className="field"
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value)}
          >
            <option value="set.releaseDate">Set release</option>
            <option value="name">Name</option>
            <option value="hp">HP</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          Order
          <select
            className="field"
            value={sortOrder}
            onChange={(event) =>
              onSortOrderChange(event.target.value as "asc" | "desc")
            }
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
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
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <label className="space-y-2 text-sm text-slate-200">
          Advanced query (overrides builder)
          <input
            className="field"
            value={advancedQuery}
            onChange={(event) => onAdvancedQueryChange(event.target.value)}
            placeholder="name:pikachu (subtypes:mega OR subtypes:vmax)"
          />
        </label>
        <div className="flex flex-wrap items-end gap-3">
          <button
            className="btn btn-primary"
            onClick={onSearch}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
          <button className="btn btn-ghost" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default QueryBuilder;
