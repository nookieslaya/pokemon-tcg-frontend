type HeaderProps = {
  activeQuery: string;
  total: number;
};

const Header = ({ activeQuery, total }: HeaderProps) => {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-teal-200/80">
          Pokemon TCG Vault
        </p>
        <h1 className="display-font text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Your Pokemon collection.
        </h1>
        <p className="max-w-2xl text-base text-slate-200/90">
          Sign in and save your favorite cards in one place.
        </p>
      </div>
      <div className="panel flex flex-wrap items-center gap-4 px-5 py-4">
        <div>
          <p className="text-xs text-slate-300">Current query</p>
          <p className="text-sm text-white">{activeQuery || "name:*"}</p>
        </div>
        <div className="h-10 w-px bg-slate-700/60" />
        <div>
          <p className="text-xs text-slate-300">Results</p>
          <p className="text-lg text-white">{total.toLocaleString()}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
