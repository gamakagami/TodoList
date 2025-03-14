import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { UserCircle } from "lucide-react"; // Profile icon

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="h-[10vh] bg-[#161B33] py-4 px-6 flex justify-between items-center relative">
            <h1 className="text-2xl font-bold text-[#1E4DB7]">Gabriel Anderson</h1>

            <div className="flex items-center space-x-4">
                {/* Home Button */}
                <Button variant="text" className="cursor-pointer" onClick={() => navigate('/')}>
                    Home
                </Button>

                <Button variant="text" className="cursor-pointer" onClick={() => navigate('/Signin')}>
                    Sign In
                </Button>
                <Button variant="primary" className="cursor-pointer" onClick={() => navigate('/Signup')}>
                    Sign Up
                </Button>

                {/* Profile Icon */}
                <div className="relative">
                    <UserCircle
                        className="w-8 h-8 text-white cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                            <button
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                                onClick={() => navigate('/profile')}
                            >
                                Profile
                            </button>
                            <button
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                                onClick={() => navigate('/settings')}
                            >
                                Settings
                            </button>
                            <button
                                className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left cursor-pointer"
                                onClick={() => console.log("Logout function here")}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
