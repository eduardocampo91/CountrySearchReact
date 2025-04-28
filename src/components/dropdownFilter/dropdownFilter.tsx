
interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

function DropdownFilter({ options, value, onChange, label }: Props) {
    return (
        <div className="mb-4">
          <label className="form-label">{label}</label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="form-select"
          >
            <option value="">All</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
  }
  
  export default DropdownFilter;
  