import { useEffect, useRef, useState } from "react";
import AccountDropdown from "../Components/AccountDropdown.jsx";
import AccountLogin from "../Components/AccountLogin.jsx";
import ProfileModal from "../Components/ProfileModal.jsx";
import SearchFilter from "../Components/SearchFilter.jsx";
import SettingsModal from "../Components/SettingsModal.jsx";
import LandingPage from "./pages/LandingPage";

function App() {
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // 🔹 STEP 1: ref for login area
  const loginRef = useRef(null);

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : {
          race: "dwarf",
          pronouns: "They / Them",
          status: "Ready to roll initiative!",
        };
  });

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => (res.ok ? res.json() : null))
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  // scroll + jiggle handler
  function handleLandingCTA() {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Jiggle login buttons
    if (loginRef.current) {
      loginRef.current.classList.add("jiggle");

      setTimeout(() => {
        loginRef.current.classList.remove("jiggle");
      }, 600);
    }
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="brand-logo">ADVNTR</div>

          {/* 🔹 STEP 3: attach ref here */}
          <div className="header-right" ref={loginRef}>
            {!user && <AccountLogin setUser={setUser} />}

            {user && (
              <AccountDropdown
                user={user}
                profile={profile}
                onLogout={() => setUser(null)}
                onOpenProfile={() => setProfileOpen(true)}
                onOpenSettings={() => setSettingsOpen(true)}
              />
            )}
          </div>
        </div>
      </header>

      {/* ================= GLOBAL MODALS ================= */}
      {profileOpen && (
        <ProfileModal
          user={user}
          profile={profile}
          setProfile={setProfile}
          onClose={() => setProfileOpen(false)}
        />
      )}

      {settingsOpen && (
        <SettingsModal
          user={user}
          setUser={setUser}
          onClose={() => setSettingsOpen(false)}
          onLogout={() => setUser(null)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      {!user ? (
        <LandingPage onCTA={handleLandingCTA} />
      ) : (
        <>
          <section className="hero">
            <div className="hero-overlay">
              <h1>Find Your Party</h1>
              <p>Connect with adventurers. Start legendary campaigns.</p>
            </div>
          </section>

          <main className="app-main">
            <SearchFilter />
          </main>
        </>
      )}
    </>
  );
}

export default App;
