interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <>
      <input
        type="text"
        value={value}
        placeholder={placeholder || "Search..."}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
      />
    </>
  );
}

export default SearchBar;
