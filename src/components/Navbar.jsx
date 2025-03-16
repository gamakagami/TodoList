import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import { UserCircle } from "lucide-react";
import ProfileModal from "./ProfileModal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // Fallback profile picture (simple SVG data URL)
  const FALLBACK_PROFILE_PIC = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='22' fill='%23718096'/%3E%3Cpath d='M25,85 Q50,65 75,85 L75,100 L25,100 Z' fill='%23718096'/%3E%3C/svg%3E";

  // Fetch user's profile picture when component mounts or user changes
  useEffect(() => {
    const fetchProfilePic = async () => {
      if (isLoggedIn && user) {
        try {
          const userDocRef = doc(db, "profile", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists() && userDoc.data().profilePic) {
            setProfilePic(userDoc.data().profilePic);
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      }
    };

    fetchProfilePic();
  }, [isLoggedIn, user]);

  // Don't show login/logout options while authentication is still loading
  if (loading) {
    return (
      <nav className="h-[10vh] bg-[#161B33] py-4 px-6 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold text-[#1E4DB7]">Gabriel Anderson</h1>
        <div className="flex items-center space-x-4">
          <Button variant="text" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="h-[10vh] bg-[#161B33] py-4 px-6 flex justify-between items-center relative">
      <h1 className="text-2xl font-bold text-[#1E4DB7]">Gabriel Anderson</h1>

      <div className="flex items-center space-x-4">
        <Button variant="text" onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}>
          {isLoggedIn ? "Dashboard" : "Home"}
        </Button>

        {isLoggedIn && user ? (
          <>
            {/* Profile Icon - Opens Modal */}
            {profilePic ? (
              <img 
                src={profilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer border border-[#1E4DB7]"
                onClick={() => setIsModalOpen(true)}
                onError={(e) => {
                  console.error("Profile image failed to load");
                  e.target.src = FALLBACK_PROFILE_PIC;
                }}
              />
            ) : (
              <UserCircle
                className="w-8 h-8 text-white cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            )}

            {/* Profile Modal */}
            <ProfileModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  onProfileUpdate={(newProfilePic) => setProfilePic(newProfilePic)} 
/>
          </>
        ) : (
          <>
            <Button variant="text" onClick={() => navigate("/signin")}>Sign In</Button>
            <Button variant="primary" onClick={() => navigate("/signup")}>Sign Up</Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;