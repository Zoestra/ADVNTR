import "../styles/landing.css";

function LandingPage({ onCTA }) {
  return (
    <>
      {/* HERO */}
      <section
        className="landing-hero"
        style={{
          backgroundImage: "url(/images/landing/hero-wizard.jpg)",
        }}
      >
        <div className="landing-hero-content">
          <h1>Find Your Party</h1>
          <p>
            Connect with Dungeon Masters and players.
            Build legendary campaigns together.
          </p>

          <button className="cta-primary" onClick={onCTA}>
            Start Your Adventure
          </button>
        </div>
      </section>

      {/* FEATURE 1 */}
      <section
        className="landing-feature-image"
        style={{
          backgroundImage: "url(/images/landing/dice-closeup.jpg)",
        }}
      >
        <div className="feature-overlay">
          <h2>Roll Into New Campaigns</h2>
          <p>
            Discover games that match your schedule, style,
            and experience level.
          </p>
        </div>
      </section>

      {/* FEATURE 2 */}
      <section
        className="landing-feature-image"
        style={{
          backgroundImage: "url(/images/landing/party-horizon.jpg)",
        }}
      >
        <div className="feature-overlay right">
          <h2>Meet Adventurers Like You</h2>
          <p>
            Whether you’re a seasoned DM or a new player,
            find your people instantly.
          </p>
        </div>
      </section>

      {/* FEATURE 3 */}
      <section
        className="landing-feature-image"
        style={{
          backgroundImage: "url(/images/landing/dragon-battle.jpg)",
        }}
      >
        <div className="feature-overlay">
          <h2>Epic Stories Await</h2>
          <p>
            From cozy taverns to dragon-slaying quests,
            your next story starts here.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="landing-cta">
        <h2>Your adventure begins now</h2>
        <button className="cta-primary" onClick={onCTA}>
          Join Free
        </button>
      </section>
    </>
  );
}

export default LandingPage;
