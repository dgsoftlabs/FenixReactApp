export default function ConnectionsTable({ connections }) {
  if (!connections || connections.length === 0) {
    return <p className="loading">No connections.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Lp</th>
            <th>Connection Name</th>
            <th>Live</th>
            <th>Parameters</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((conn, i) => (
            <tr key={i} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td>{i}</td>
              <td>{conn.connectionName}</td>
              <td>
                <span className={`badge ${conn.isLive ? 'badge-success' : 'badge-danger'}`}>
                  {conn.isLive ? '● Live' : '● Offline'}
                </span>
              </td>
              <td>
                {Object.entries(conn.driverParam || {}).map(([k, v]) => (
                  <div key={k}><strong>{k}:</strong> {String(v)}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
