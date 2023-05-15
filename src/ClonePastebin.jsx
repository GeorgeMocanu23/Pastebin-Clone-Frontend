import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddContent from "./pages/AddContent";
import UserProfile from "./pages/UserProfile";

function ClonePastebin() {

    return (
        <div style={{ fontFamily: 'Monospace', backgroundColor: "lightblue", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <h1 className="text-secondary">Clone Pastebin</h1>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/:id" element={<UserProfile />} />
                    <Route path="/content" element={<AddContent />} />
                </Routes>
            </Router>
        </div>
    );
}

export default ClonePastebin;