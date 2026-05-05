export default function EventsTable({ events }) {
  const list = Array.isArray(events) ? events : Object.values(events);

  if (list.length === 0) {
    return <p className="loading">No events.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Lp</th>
            <th>Time</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {list.map((ev, i) => (
            <tr key={i} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td>{i}</td>
              <td>{ev.frDateTime}</td>
              <td>{ev.Mess}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
