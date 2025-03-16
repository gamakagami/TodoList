import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

export default function ProfileModal({ isOpen, onClose, onLogout,onProfileUpdate }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Predefined profile picture URLs using reliable public sources
  const PREDEFINED_PROFILE_PICS = [
    "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/2.png",
    "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/40.png",
    "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/86.png"
  ];

  // Fallback profile picture (simple SVG data URL)
  const FALLBACK_PROFILE_PIC = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='22' fill='%23718096'/%3E%3Cpath d='M25,85 Q50,65 75,85 L75,100 L25,100 Z' fill='%23718096'/%3E%3C/svg%3E";

  const DEFAULT_PROFILE_PIC = PREDEFINED_PROFILE_PICS[0]; // Default to the first image

  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
  });
  const [originalData, setOriginalData] = useState({
    fullName: "",
    email: "",
    bio: "",
  });
  const [profilePic, setProfilePic] = useState(DEFAULT_PROFILE_PIC);
  const [error, setError] = useState(null);

  // Fetch user profile data when the component mounts or user changes
  useEffect(() => {
    if (user && !loading) {
      fetchUserProfile();
    }
  }, [user, loading]);

  // Fetch user profile from Firestore
  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      setError(null);
      const userDocRef = doc(db, "profile", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const newData = {
          fullName: userData["Full Name"] || "",
          email: userData["Email"] || user.email,
          bio: userData["Bio"] || "",
        };
        setFormData(newData);
        setOriginalData(newData);

        // Set profile picture from Firestore or default
        if (userData.profilePic) {
          setProfilePic(userData.profilePic);
        } else {
          setProfilePic(DEFAULT_PROFILE_PIC);
        }
      } else {
        // Create a new profile if it doesn't exist
        const newUserProfile = {
          "Full Name": user.displayName || "",
          "Email": user.email || "",
          "Bio": "",
          profilePic: DEFAULT_PROFILE_PIC,
        };
        await setDoc(userDocRef, newUserProfile);
        setFormData({
          fullName: newUserProfile["Full Name"],
          email: newUserProfile["Email"],
          bio: newUserProfile["Bio"],
        });
        setOriginalData({
          fullName: newUserProfile["Full Name"],
          email: newUserProfile["Email"],
          bio: newUserProfile["Bio"],
        });
        setProfilePic(DEFAULT_PROFILE_PIC);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      setError("Failed to load profile. Please try again.");
    }
  };

  // Handle editing a field
  const handleEdit = (field) => {
    setEditField(field);
  };

  // Handle changes to the form data
  const handleChange = (e) => {
    setFormData({ ...formData, [editField]: e.target.value });
  };

  // Save changes to Firestore
  const handleSave = async () => {
    if (!user) {
      setError("Cannot save: No user is logged in");
      return;
    }
    if (!editField) {
      setError("Cannot save: No field is being edited");
      return;
    }

    setError(null);
    const userDocRef = doc(db, "profile", user.uid);

    try {
      const fieldMappings = {
        fullName: "Full Name",
        bio: "Bio",
      };

      await updateDoc(userDocRef, {
        [fieldMappings[editField]]: formData[editField],
      });

      setOriginalData({ ...originalData, [editField]: formData[editField] });
      setEditField(null);
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setError(`Failed to update profile: ${error.message}`);
    }
  };

  // Cancel editing and revert to original data
  const handleCancel = () => {
    setFormData({
      ...formData,
      [editField]: originalData[editField],
    });
    setEditField(null);
  };

  // Close the modal
  const handleClose = () => {
    if (editField) {
      setFormData({
        ...formData,
        [editField]: originalData[editField],
      });
      setEditField(null);
    }
    onClose();
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout?.();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error.message);
      setError(`Logout failed: ${error.message}`);
    }
  };

  // Handle profile picture change
  const handleProfilePicChange = async (selectedPic) => {
    if (!user) {
      setError("Cannot update: No user is logged in");
      return;
    }
  
    try {
      // Update local state first for immediate UI feedback
      setProfilePic(selectedPic);
  
      // Update Firestore document with the new profile picture URL
      const userDocRef = doc(db, "profile", user.uid);
      await updateDoc(userDocRef, { profilePic: selectedPic });
  
      // Notify parent component about the profile picture change
      onProfileUpdate?.(selectedPic);
  
      console.log("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setError(`Failed to update profile picture: ${error.message}`);
    }
  };

  // Function to preload images
  useEffect(() => {
    PREDEFINED_PROFILE_PICS.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Don't render the modal if it's not open
  if (!isOpen) return null;

  // Show loading state
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show message if user is not logged in
  if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <p>Please log in to view your profile</p>
          <button onClick={onClose} className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600 mt-4">
            Close
          </button>
        </div>
      </div>
    );
  }

  // Main modal UI
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        {error && (
          <div className="bg-red-500 text-white p-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Profile Picture Selection */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-24 h-24">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-[#1E4DB7] object-cover"
              onError={(e) => {
                console.error("Image failed to load:", profilePic);
                e.target.src = FALLBACK_PROFILE_PIC;
              }}
            />
          </div>
          <div className="flex gap-2 mt-2">
            {PREDEFINED_PROFILE_PICS.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`Profile ${index + 1}`}
                className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                  profilePic === pic ? "border-blue-500" : "border-transparent"
                } hover:border-blue-300 transition-all duration-200`}
                onClick={() => handleProfilePicChange(pic)}
                onError={(e) => {
                  console.error(`Thumbnail ${index} failed to load:`, pic);
                  e.target.src = FALLBACK_PROFILE_PIC;
                }}
              />
            ))}
          </div>
        </div>

        {/* Editable Fields (Full Name and Bio) */}
        {[
          { key: "fullName", label: "Full Name" },
          { key: "bio", label: "Bio" },
        ].map(({ key, label }) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-300 mb-1">{label}</label>
            <div className="bg-[#474973] p-3 rounded-lg flex justify-between items-center">
              {editField === key ? (
                <input
                  type="text"
                  value={formData[key]}
                  onChange={handleChange}
                  className="bg-transparent border-none focus:outline-none text-white w-full"
                />
              ) : (
                <p>{formData[key]}</p>
              )}

              {editField === key ? (
                <div className="flex gap-2">
                  <button
                    className="text-green-400 hover:underline ml-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-400 hover:underline ml-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="text-blue-400 hover:underline ml-2"
                  onClick={() => handleEdit(key)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Non-editable Email Field */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <div className="bg-[#474973] p-3 rounded-lg">
            <p>{formData.email}</p>
          </div>
        </div>

        {/* Buttons: Logout and Close */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}