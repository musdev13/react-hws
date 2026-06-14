import titleImg from '../assets/title.png';
import discordSvg from '../assets/discord.svg';
import telegramSvg from '../assets/telegram.svg';

interface MainStyles {
  container: React.CSSProperties;
  hero: React.CSSProperties;
  titleAsset: React.CSSProperties;
  subtitle: React.CSSProperties;
  socials: React.CSSProperties;
  socialIcon: React.CSSProperties;
}

const Main = () => {
  return (
    <main style={styles.container}>
      <div style={styles.hero}>
        
        <img 
          src={titleImg} 
          alt="M² Studio" 
          style={styles.titleAsset} 
          className="main-title-hover" 
        />

        <h2 style={styles.subtitle} className="main-subtitle-hover">
          We are a small team making "weird" projects
        </h2>
        
        <div style={styles.socials}>
          <a href="https://discord.gg" target="_blank" rel="noreferrer">
            <img src={discordSvg} alt="Discord" style={styles.socialIcon} className="social-hover-icon" />
          </a>
          <a href="https://t.me" target="_blank" rel="noreferrer">
            <img src={telegramSvg} alt="Telegram" style={styles.socialIcon} className="social-hover-icon" />
          </a>
        </div>

      </div>
    </main>
  );
};

const styles: MainStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh',
    textAlign: 'center',
    padding: '0 20px',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleAsset: {
    height: '65px',
    width: 'auto',
    objectFit: 'contain',
    marginBottom: '30px',
    display: 'block',
    transition: 'transform 0.3s ease',
  },
  subtitle: {
    fontSize: '28px',
    fontWeight: 400,
    color: '#ffffff',
    margin: '0 0 35px 0',
    letterSpacing: '1px',
    display: 'inline-block',
    transition: 'all 0.3s ease',
  },
  socials: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  socialIcon: {
    width: '42px',
    height: '42px',
    display: 'block',
    transition: 'transform 0.2s ease',
  }
};

export default Main;