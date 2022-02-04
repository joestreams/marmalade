import classNames from "classnames";

export function Button({
    children,
    href,
    type = "submit",
    variant = "primary",
    ...props
}) {
    const className = classNames(
        "inline-flex items-center border border-transparent text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500",
        variant !== "link" && "shadow-sm px-4 py-2 rounded-full",
        variant === "primary" && "text-white bg-orange-600 hover:bg-orange-700",
        variant === "link" && "text-orange-600 hover:text-orange-700 rounded-md"
    );

    if (href) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={className} {...props}>
            {children}
        </button>
    );
}
