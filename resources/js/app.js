import { useEffect, useState } from "react";
import { render } from "react-dom";
import { useDebounce } from "use-debounce";
import classNames from "classnames";
import axios from "axios";
import { startCase } from "lodash";

function App({ user }) {
    const [currentUser, setCurrentUser] = useState(user);

    async function logout(e) {
        e.preventDefault();

        try {
            await axios.post("/api/logout");

            setCurrentUser(null);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="space-y-8">
                <div className="text-center">
                    <Logo />
                </div>
                {currentUser && (
                    <div>
                        <p className="font-light text-lg my-8">
                            Welcome back, {user.name}!
                        </p>
                        <SetupArtistProfile />
                        <form onSubmit={logout}>
                            <Button>Logout</Button>
                        </form>
                    </div>
                )}
                {!currentUser && (
                    <Button href="/auth/spotify/redirect">
                        Login with Spotify
                    </Button>
                )}
            </div>
        </div>
    );
}

function SetupArtistProfile() {
    const [query, setQuery] = useState("");
    const [q] = useDebounce(query, 300);

    useEffect(() => {
        if (q.length > 0) {
            findArtists(q);
        }
    }, [q]);

    async function findArtists(q) {
        try {
            const { data } = await axios.get(
                `/api/spotify/search/artists?q=${q}`
            );

            console.dir(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form className="mb-12">
            <p className="mb-4">Let's set up your artist profile!</p>

            <TextField
                label="Find artist:"
                name="query"
                value={query}
                onChange={setQuery}
            />
        </form>
    );
}

function TextField({ name, value, onChange, ...props }) {
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

function Logo() {
    return (
        <div className="inline-block border-b-4 border-orange-300 relative">
            <h1 className="font-semibold tracking-tight text-2xl">Marmalade</h1>
            <div className="w-2.5 h-2.5 rounded-full bg-orange-600 absolute top-0 right-0 mt-1 -mr-2.5" />
        </div>
    );
}

function Button({ children, href, type = "submit" }) {
    const className = classNames(
        "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm",
        "text-white bg-orange-600",
        "hover:bg-orange-700",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
    );

    if (href) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={className}>
            {children}
        </button>
    );
}

const el = document.getElementById("app");
const { user: userData } = el.dataset;
const user = userData ? JSON.parse(userData) : null;

render(<App user={user} />, el);
