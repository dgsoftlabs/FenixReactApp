import { useState, useEffect, useCallback } from 'react';
import HeaderPanel from './components/HeaderPanel.jsx';
import TagsTable from './components/TagsTable.jsx';
import ConnectionsTable from './components/ConnectionsTable.jsx';
import EventsTable from './components/EventsTable.jsx';
import ChartView from './components/ChartView.jsx';
import {
  fetchServerInfo, fetchTags, fetchConnections,
  fetchEvents, fetchGraph, fetchBuffor, setBuffor, clearAlarms,
} from './api.js';

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') ?? 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() =>
    setTheme(t => t === 'dark' ? 'light' : 'dark'), []);

  const [tags, setTags] = useState({});
  const [tagsError, setTagsError] = useState(null);
  const [connections, setConnections] = useState([]);
  const [events, setEvents] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [serverTime, setServerTime] = useState('');
  const [user, setUser] = useState('');
  const [machine, setMachine] = useState('');
  const [buffor, setBufforState] = useState('');
  const [showTable, setShowTable] = useState(true);
  const [showChart, setShowChart] = useState(true);
  const [showConnections, setShowConnections] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  // Poll Timer / User / Machine every 1 s
  useEffect(() => {
    async function poll() {
      try {
        const [time, usr, mach] = await Promise.all([
          fetchServerInfo('Timer', 'tm'),
          fetchServerInfo('User', 'usr'),
          fetchServerInfo('Machine', 'mach'),
        ]);
        setServerTime(time);
        setUser(usr);
        setMachine(mach);
      } catch { /* ignore network errors during polling */ }
    }
    poll();
    const id = setInterval(poll, 1000);
    return () => clearInterval(id);
  }, []);

  // Poll Tags every 2 s
  useEffect(() => {
    async function poll() {
      try {
        const data = await fetchTags();
        if (Object.keys(data).length > 0) { setTags(data); setTagsError(null); }
      }
      catch (e) { setTagsError(e.message); }
    }
    poll();
    const id = setInterval(poll, 2000);
    return () => clearInterval(id);
  }, []);

  // Poll Connections every 2 s
  useEffect(() => {
    async function poll() {
      try { setConnections(await fetchConnections()); } catch { /* ignore */ }
    }
    poll();
    const id = setInterval(poll, 2000);
    return () => clearInterval(id);
  }, []);

  // Poll Events every 2 s
  useEffect(() => {
    async function poll() {
      try { setEvents(await fetchEvents()); } catch { /* ignore */ }
    }
    poll();
    const id = setInterval(poll, 2000);
    return () => clearInterval(id);
  }, []);

  // Poll Graph every 2 s
  useEffect(() => {
    async function poll() {
      try {
        const data = await fetchGraph();
        if (data.length > 0) setGraphData(data);
      } catch { /* ignore */ }
    }
    poll();
    const id = setInterval(poll, 2000);
    return () => clearInterval(id);
  }, []);

  // Fetch initial buffer value once
  useEffect(() => {
    fetchBuffor().then(setBufforState).catch(() => {});
  }, []);

  const handleSetBuffor = useCallback(async (value) => {
    try {
      const msg = await setBuffor(value);
      alert('Data Changed: ' + msg);
    } catch (e) {
      alert('Error: ' + e.message);
    }
  }, []);

  const handleClearAlarms = useCallback(async () => {
    try {
      const msg = await clearAlarms();
      alert(msg);
    } catch (e) {
      alert('Error: ' + e.message);
    }
  }, []);

  return (
    <>
      <HeaderPanel
        user={user}
        serverTime={serverTime}
        machine={machine}
        buffor={buffor}
        onBufforChange={setBufforState}
        onSetBuffor={handleSetBuffor}
        onClearAlarms={handleClearAlarms}
        onToggleTable={() => setShowTable(v => !v)}
        onToggleChart={() => setShowChart(v => !v)}
        onToggleConnections={() => setShowConnections(v => !v)}
        onToggleEvents={() => setShowEvents(v => !v)}
        showTable={showTable}
        showChart={showChart}
        showConnections={showConnections}
        showEvents={showEvents}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className="app">
        {showTable && (
          <section className="panel">
            <div className="panel-header">
              <h2><span className="panel-icon">☰</span> Tags</h2>
            </div>
            <div className="panel-body">
              <TagsTable tags={tags} error={tagsError} />
            </div>
          </section>
        )}

        {showChart && (
          <section className="panel">
            <div className="panel-header">
              <h2><span className="panel-icon">📈</span> Chart</h2>
            </div>
            <div className="panel-body">
              <ChartView data={graphData} />
            </div>
          </section>
        )}

        {showConnections && (
          <section className="panel">
            <div className="panel-header">
              <h2><span className="panel-icon">🔗</span> Connections</h2>
            </div>
            <div className="panel-body">
              <ConnectionsTable connections={connections} />
            </div>
          </section>
        )}

        {showEvents && (
          <section className="panel">
            <div className="panel-header">
              <h2><span className="panel-icon">📋</span> Events</h2>
            </div>
            <div className="panel-body">
              <EventsTable events={events} />
            </div>
          </section>
        )}
      </div>
    </>
  );
}
