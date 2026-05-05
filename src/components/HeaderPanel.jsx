import logo from '/favicon.ico'

export default function HeaderPanel({
  user, serverTime, machine, buffor,
  onBufforChange, onSetBuffor, onClearAlarms,
  onToggleTable, onToggleChart, onToggleConnections, onToggleEvents,
  showTable, showChart, showConnections, showEvents,
  theme, onToggleTheme,
}) {
  return (
    <>
      {/* ── Top Navbar ── */}
      <nav className="navbar">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Fenix" />
          <span>Fenix Modbus</span>
        </a>

        <div className="navbar-stats">
          <div className="stat-chip">
            <span className="dot" />
            <span>User: <strong>{user || '—'}</strong></span>
          </div>
          <div className="stat-chip">
            <span>Time: <strong>{serverTime || '—'}</strong></span>
          </div>
          <div className="stat-chip">
            <span>Machine: <strong>{machine || '—'}</strong></span>
          </div>
        </div>

        <button className="btn btn-danger" onClick={onClearAlarms}>
          ⚠ Clear Alarms
        </button>

        <button
          className="btn-theme"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* ── Controls bar ── */}
      <div className="controls-bar">
        <div className="controls-group">
          <button
            className={`btn ${showTable ? 'btn-active' : ''}`}
            onClick={onToggleTable}
          >
            ☰ Tags
          </button>
          <button
            className={`btn ${showChart ? 'btn-active' : ''}`}
            onClick={onToggleChart}
          >
            📈 Chart
          </button>
          <button
            className={`btn ${showConnections ? 'btn-active' : ''}`}
            onClick={onToggleConnections}
          >
            🔗 Connections
          </button>
          <button
            className={`btn ${showEvents ? 'btn-active' : ''}`}
            onClick={onToggleEvents}
          >
            📋 Events
          </button>
        </div>

        <div className="controls-divider" />

        <div className="controls-group">
          <label className="buffor-label">
            Chart window [sec]:
            <input
              value={buffor}
              onChange={e => onBufforChange(e.target.value)}
              style={{ width: 64 }}
            />
          </label>
          <button className="btn btn-primary" onClick={() => onSetBuffor(buffor)}>
            Set
          </button>
        </div>
      </div>
    </>
  );
}
