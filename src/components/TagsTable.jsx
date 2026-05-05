import { useState, useCallback } from 'react';
import { setTagValue } from '../api.js';

export default function TagsTable({ tags, error }) {
  const [inputs, setInputs] = useState({});

  const handleInputChange = useCallback((tagName, value) => {
    setInputs(prev => ({ ...prev, [tagName]: value }));
  }, []);

  const handleSend = useCallback(async (tagName) => {
    await setTagValue(tagName, inputs[tagName] ?? '');
  }, [inputs]);

  const handleKeyDown = useCallback(async (e, tagName) => {
    if (e.key === 'Enter') {
      await setTagValue(tagName, e.target.value);
    }
  }, []);

  const entries = Object.entries(tags);

  if (error) {
    return <p className="loading" style={{color:'var(--color-danger)'}}>Error loading tags: {error}</p>;
  }

  if (entries.length === 0) {
    return <p className="loading">Loading tags…</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Device Address</th>
            <th>Start</th>
            <th>Bit/Byte</th>
            <th>Data Type</th>
            <th>Area Data</th>
            <th>Value</th>
            <th>Description</th>
            <th>Set Value</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([name, tag], i) => (
            <tr key={name} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td>{name}</td>
              <td>{tag.deviceAdress ?? 'n/a'}</td>
              <td>{tag.startData ?? 'n/a'}</td>
              <td>{tag.scAdres ?? 'n/a'}</td>
              <td>{tag.typeData ?? 'n/a'}</td>
              <td>{tag.areaData ?? 'n/a'}</td>
              <td className="value-cell">{tag.formattedValue ?? 'n/a'}</td>
              <td>{tag.description ?? 'n/a'}</td>
              <td>
                <input
                  className="tag-input"
                  value={inputs[name] ?? ''}
                  onChange={e => handleInputChange(name, e.target.value)}
                  onKeyDown={e => handleKeyDown(e, name)}
                />
              </td>
              <td>
                <button className="btn btn-primary" style={{padding:'4px 10px',fontSize:'12px'}} onClick={() => handleSend(name)}>Send</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
