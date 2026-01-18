type BuilderInput = {
  name: string;
  type: string;
  setName: string;
  rarity: string;
};

const wrapToken = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /\s/.test(trimmed) ? `"${trimmed}"` : trimmed;
};

const buildPokemonQuery = (input: BuilderInput) => {
  const parts: string[] = [];
  const { name, type, setName, rarity } = input;

  if (name.trim()) {
    parts.push(`name:${wrapToken(name)}`);
  }
  if (type.trim()) {
    parts.push(`types:${wrapToken(type)}`);
  }
  if (setName.trim()) {
    parts.push(`set.name:${wrapToken(setName)}`);
  }
  if (rarity.trim()) {
    parts.push(`rarity:${wrapToken(rarity)}`);
  }
  return parts.join(" AND ");
};

export { buildPokemonQuery };
