
interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

function DropdownFilter({ options, value, onChange, label }: Props) {
    return (
        <div className="mb-4">
          <label className="block text-sm font-semibold">{label}</label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 p-2 border rounded"
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
  