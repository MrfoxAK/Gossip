import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useState } from "react";
import './Navbar.css'; // Importing external CSS for better separation of concerns

const Navbar = () => {
  const { authUser, logout: storeLogout } = useAuthStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true); // Show confirmation modal
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false); // Hide modal
    storeLogout(); // Perform the logout action
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Hide modal if canceled
  };

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Gossip</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout Button that triggers modal */}
                <button
                  className="flex gap-2 items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-xl scaleIn">
            <p className="text-lg mb-6 font-medium text-gray-800">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-6">
              <button
                onClick={confirmLogout}
                className="btn btn-sm btn-primary hover:scale-105 transition-all"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="btn btn-sm btn-secondary hover:scale-105 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
