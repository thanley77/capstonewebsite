import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Port = (props) => (
  <tr>
    <td>{props.port.port_number}</td>
    <td>{props.port.state}</td>
    <td>{props.port.protocol}</td>
    <td>{props.port.service}</td>
  </tr>
);

const Nmap = (props) => (
  <tr>
    <td>{props.nmap._id}</td>
    <td>
      <table>
        <thead>
          <tr>
            <th>Port Number</th>
            <th>State</th>
            <th>Protocol</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          {props.nmap.scan.map((port) => {
            return <Port port={port} key={port.port_number} />;
          })}
        </tbody>
      </table>
    </td>
  </tr>
);

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

  function nmapListTable() {
    return nmapList.map((nmap) => {
      return <Nmap nmap={nmap} key={nmap._id} />;
    });
  }

  return (
    <div>
      <h3>Nmap List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Ports</th>
          </tr>
        </thead>
        <tbody>{nmapListTable()}</tbody>
      </table>
    </div>
  );
};

export default NmapList;

