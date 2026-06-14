import logoImg from '../assets/logo.png';

interface HeaderStyles {
  header: React.CSSProperties;
  logoWrapper: React.CSSProperties;
  logoAsset: React.CSSProperties;
  nav: React.CSSProperties;
  navItem: React.CSSProperties;
}

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoWrapper}>
        <img src={logoImg} alt="M² Logo" style={styles.logoAsset} />
      </div>

      <nav style={styles.nav}>
        <a href="#about" style={styles.navItem} className="nav-hover-item">About</a>
        <a href="#projects" style={styles.navItem} className="nav-hover-item">Projects</a>
        <a href="#philosophy" style={styles.navItem} className="nav-hover-item">Philosophy</a>
        <a href="#join" style={styles.navItem} className="nav-hover-item">Join</a>
      </nav>
    </header>
  );
};

const styles: HeaderStyles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '40px 60px',
    width: '100%',
    boxSizing: 'border-box',
  },
  logoWrapper: {
    position: 'absolute',
    left: '60px',
    display: 'flex',
    alignItems: 'center',
  },
  logoAsset: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain',
  },
  nav: {
    display: 'flex',
    gap: '35px',
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 500,
    opacity: 0.9,
    display: 'inline-block',
    transition: 'all 0.2s ease',
  },
};

export default Header;