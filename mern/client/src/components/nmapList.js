import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NmapList = () => {
  const { db_name } = useParams();
  const [nmapList, setNmapList] = useState([]);

  useEffect(() => {
    async function getNmapList() {
      const response = await fetch(`/${db_name}/nmap`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const nmapList = await response.json();
      setNmapList(nmapList);
    }

    getNmapList();
  }, [db_name]);

  return (
    <div>
      <h3>Nmap List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Host</th>
            <th>Ports</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {nmapList.map((nmap) => (
            <tr key={nmap._id}>
              <td>{nmap.host}</td>
              <td>{nmap.ports.join(", ")}</td>
              <td>{nmap.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NmapList;
