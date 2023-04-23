import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const Nmap = (props) => {
  const { nmap } = props;
  const { _id, scan } = nmap;

  const portList = Object.keys(scan).map((port) => {
    return (
      <td key={port}>{port}</td>
    );
  });

  const serviceList = Object.keys(scan).map((port) => {
    return (
      <td key={port}>{scan[port].Service}</td>
    );
  });

  const stateList = Object.keys(scan).map((port) => {
    return (
      <td key={port}>{scan[port].State}</td>
    );
  });

  return (
    <tr>
      <td>{_id}</td>
      {portList}
      {serviceList}
      {stateList}
    </tr>
  );
};

export default function NmapList() {
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

  function nmapListTable() {
    const header = nmapList.length > 0 ? (
      <>
        <th>Domain</th>
        {Object.keys(nmapList[0].scan).map((port) => (
          <th key={port}>{port}</th>
        ))}
        {Object.keys(nmapList[0].scan).map((port) => (
          <th key={`${port}_service`}>Service</th>
        ))}
        {Object.keys(nmapList[0].scan).map((port) => (
          <th key={`${port}_state`}>State</th>
        ))}
      </>
    ) : null;

    const rows = nmapList.map((nmap) => {
      return (
        <Nmap
          nmap={nmap}
          key={nmap._id}
        />
      );
    });

    return (
      <>
        <thead>
          <tr>
            {header}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </>
    );
  }

  return (
    <div>
      <h3>Nmap List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        {nmapListTable()}
      </table>
    </div>
  );
}
