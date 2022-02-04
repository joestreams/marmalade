import { Fragment, useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";

import { AppContext } from "../../context";
import { Button, Page } from "../../components";
import { TextField } from "../../components/form";

export function Setup() {
    const { setUser } = useContext(AppContext);

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

            setUser(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Page requiresAuth>
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
        </Page>
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
