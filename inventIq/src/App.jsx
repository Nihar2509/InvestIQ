import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

function TestProtectedPage() {
    return (
        <div>
            <h1>Protected Page</h1>
            <p>You are successfully authenticated.</p>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Register />} />

            <Route
                path="/protected-test"
                element={
                    <ProtectedRoute>
                        <TestProtectedPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;