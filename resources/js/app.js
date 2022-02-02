import { useEffect, useState, Fragment } from "react";
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

    if (!currentUser) return <Login />;

    return <Home user={currentUser} logout={logout} />;
}

function Login() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="space-y-8">
                <div className="text-center">
                    <Logo />
                </div>
                <Button href="/auth/spotify/redirect">
                    Login with Spotify
                </Button>
            </div>
        </div>
    );
}

function Home({ user, logout }) {
    return (
        <div className="max-w-xl p-4 mx-auto">
            <Logo />
            <p className="font-light text-lg my-8">Welcome, {user.name}!</p>
            <SetupArtistProfile />
            <form onSubmit={logout}>
                <Button variant="link">Logout</Button>
            </form>
        </div>
    );
}

function SetupArtistProfile() {
    const [query, setQuery] = useState("");
    const [q] = useDebounce(query, 300);
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);

    useEffect(() => {
        if (q.length > 0) {
            findArtists(q);
        } else {
            setArtists([]);
        }
    }, [q]);

    async function findArtists(q) {
        try {
            const { data } = await axios.get(
                `/api/spotify/search/artists?q=${q}`
            );

            setArtists(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function createArtist(e) {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/artists", {
                artist: selectedArtist,
            });

            console.dir(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form className="mb-12 space-y-4" onSubmit={createArtist}>
            <p>Let's set up your artist profile!</p>

            {selectedArtist && (
                <Fragment>
                    <Artist artist={selectedArtist} />
                    <Button
                        type="button"
                        onClick={() => setSelectedArtist(null)}
                        variant="link"
                    >
                        De-select this artist
                    </Button>
                    <div>
                        <Button>Continue</Button>
                    </div>
                </Fragment>
            )}

            {!selectedArtist && (
                <Fragment>
                    <TextField
                        label="Find artist:"
                        name="query"
                        value={query}
                        onChange={setQuery}
                        autoComplete="off"
                        autoFocus
                    />
                    {artists.length > 0 && (
                        <div className="border rounded-md bg-white divide-y">
                            {artists.map((artist) => (
                                <ArtistListItem
                                    key={artist.id}
                                    artist={artist}
                                    onSelect={setSelectedArtist}
                                />
                            ))}
                        </div>
                    )}
                </Fragment>
            )}
        </form>
    );
}

function ArtistListItem({ artist, onSelect }) {
    return (
        <button
            type="button"
            onClick={(e) => onSelect(artist)}
            className="p-4 text-left w-full"
        >
            <Artist artist={artist} />
        </button>
    );
}

function Artist({ artist }) {
    const { name, genres } = artist;

    const image = artist.images ? artist.images[0] : null;

    return (
        <div className="flex items-start space-x-4">
            {image && <img src={image.url} className="rounded-md w-12 h-12" />}
            <div>
                <div className="text-lg text-slate-800 font-medium">{name}</div>
                <div className="text-slate-500">{genres.join(", ")}</div>
            </div>
        </div>
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

function Button({
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

const el = document.getElementById("app");
const { user: userData } = el.dataset;
const user = userData ? JSON.parse(userData) : null;

render(<App user={user} />, el);
