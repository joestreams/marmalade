import { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./context";
import { Navbar } from "./nav";
import { Login, Home, Setup } from "./pages";

function App({ user }) {
    const [currentUser, setCurrentUser] = useState(user);

    return (
        <BrowserRouter>
            <AppContext.Provider
                value={{ user: currentUser, setUser: setCurrentUser }}
            >
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    );
}

const el = document.getElementById("app");
const { user: userData } = el.dataset;
const user = userData ? JSON.parse(userData) : null;

render(<App user={user} />, el);
