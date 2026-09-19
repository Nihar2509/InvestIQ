import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

import StartupDashboard from "./StartupDashboard/StartupDashboard";
import InvestorMarketplace from "./InvestorMarketplace/InvestorMarketplace";
import StartupDetails from "./StartupDetails/StartupDetails";
import InvestorDashboard from "./InvestorDashboard/InvestorDashboard";

function TestProtectedPage() {
    return (
        <div>
            <h1>Protected Page</h1>
            <p>
                You are successfully authenticated.
            </p>
        </div>
    );
}

function App() {
    return (
        <Routes>

            {/* Landing Page */}
            <Route
                path="/"
                element={<LandingPage />}
            />

            {/* Authentication */}
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Register />}
            />

            {/* Startup Founder Dashboard */}
            <Route
                path="/startup-dashboard"
                element={
                    <ProtectedRoute role="startup">
                        <StartupDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Investor Dashboard */}
            <Route
                path="/investor-dashboard"
                element={
                    <ProtectedRoute role="investor">
                        <InvestorDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Investor Marketplace */}
            <Route
                path="/investor-marketplace"
                element={
                    <ProtectedRoute role="investor">
                        <InvestorMarketplace />
                    </ProtectedRoute>
                }
            />

            {/* Startup Details */}
            <Route
                path="/startup/:id"
                element={
                    <ProtectedRoute role="investor">
                        <StartupDetails />
                    </ProtectedRoute>
                }
            />

            {/* Protected Route Test */}
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