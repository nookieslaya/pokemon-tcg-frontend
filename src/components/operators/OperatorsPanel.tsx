const OperatorsPanel = () => {
  return (
    <section className="panel space-y-3 px-5 py-6">
      <h2 className="display-font text-lg">API operators</h2>
      <ul className="space-y-2 text-sm text-slate-200">
        <li>
          <span className="chip chip-accent">AND</span> combines conditions
        </li>
        <li>
          <span className="chip chip-accent">OR</span> matches multiple subtypes
        </li>
        <li>
          <span className="chip chip-accent">NOT</span> excludes cards
        </li>
        <li>
          <span className="chip chip-accent">HP</span> ranges `hp:[60 TO 120]`
        </li>
      </ul>
    </section>
  );
};

export default OperatorsPanel;
