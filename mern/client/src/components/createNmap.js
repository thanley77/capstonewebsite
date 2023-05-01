import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CreateNmap() {
  const [target, setTarget] = useState('');
  const [nmapArguments, setNmapArguments] = useState('');
  const [scan, setScan] = useState('');
  const { db_name } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNmap = {
      target,
      arguments,
      scan: JSON.parse(scan),
    };
    
    try {
      const response = await fetch(`/${db_name}/nmap/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNmap),
      });

      if (response.ok) {
        navigate(-1);
      } else {
        const error = await response.json();
        window.alert(`Error creating new Nmap: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      window.alert(`Error creating new Nmap: ${err.message}`);
    }
  };

  return (
    <div>
      <h3>Create new Nmap</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="target">Target</label>
          <input
            type="text"
            className="form-control"
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="arguments">Arguments</label>
          <input
            type="text"
            className="form-control"
            id="nmapArguments"
            value={nmapArguments}
            onChange={(e) => setNmapArguments(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="scan">Scan</label>
          <textarea
            className="form-control"
            id="scan"
            rows="10"
            value={scan}
            onChange={(e) => setScan(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateNmap;

