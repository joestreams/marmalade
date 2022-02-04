import { startCase } from "lodash";

export function TextField({ name, value, onChange, ...props }) {
    const id = props.id || name;
    const label = props.label || startCase(name.toLowerCase());

    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    name={name}
                    id={id}
                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                />
            </div>
        </div>
    );
}
