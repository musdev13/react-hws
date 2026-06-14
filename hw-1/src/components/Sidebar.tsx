interface SidebarStyles {
  sidebar: React.CSSProperties;
  rotateText: React.CSSProperties;
  line: React.CSSProperties;
  socialIcons: React.CSSProperties;
  dot: React.CSSProperties;
}

const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.rotateText}>PORTFOLIO BUILDER v1.0</div>
      <div style={styles.line}></div>
      <div style={styles.socialIcons}>
        <span style={styles.dot}></span>
        <span style={styles.dot}></span>
        <span style={styles.dot}></span>
      </div>
    </aside>
  );
};

const styles: SidebarStyles = {
  sidebar: {
    position: 'fixed',
    left: '40px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    zIndex: 10,
  },
  rotateText: {
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    color: '#333333',
    fontSize: '11px',
    letterSpacing: '2px',
  },
  line: {
    width: '1px',
    height: '80px',
    backgroundColor: '#222222',
  },
  socialIcons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  dot: {
    width: '4px',
    height: '4px',
    backgroundColor: '#ff3333',
    borderRadius: '50%',
    display: 'block',
  }
};

export default Sidebar;