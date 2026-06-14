

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.copy}>© 2024 M² Studio. All rights reserved.</p>
      <div style={styles.links}>
        <a href="#" style={styles.link}>Terms</a>
        <a href="#" style={styles.link}>Privacy</a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    position: 'absolute' as const,
    bottom: '0',
    width: '100%',
    padding: '30px 0',
    textAlign: 'center' as const,
    borderTop: '1px solid #111',
  },
  copy: {
    color: '#444',
    fontSize: '14px',
    margin: 0,
  },
  links: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  link: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '12px',
  }
};

export default Footer;