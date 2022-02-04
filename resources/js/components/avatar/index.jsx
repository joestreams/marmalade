import classNames from "classnames";

export function Avatar({ src, name, size = 10 }) {
    const initials = name.substring(0, 1).toUpperCase();

    const className = classNames(
        "rounded-full",
        size === 8 && "h-8 w-8",
        size === 10 && "h-10 w-10",
        size === 12 && "h-12 w-12",
        size === 14 && "h-14 w-14",
        !src && "inline-flex items-center justify-center bg-gray-500",
        src && "inline-block"
    );

    if (!src) {
        return (
            <span className={className}>
                <span className="font-medium leading-none text-white">
                    {initials}
                </span>
            </span>
        );
    }

    return (
        <img className={className} src={src} alt={`Profile photo of ${name}`} />
    );
}
