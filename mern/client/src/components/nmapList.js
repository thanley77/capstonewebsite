import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Port = (props) => (
  <tr>
    <td>{props.portNumber}</td>
    <td>{props.state}</td>
    <td>{props.protocol}</td>
    <td>{props.service}</td>
  </tr>
);

const Nmap = (props) => (
  <tr>
    <td>{props._id}</td>
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
          {Object.keys(props.scan).map((portNumber) => {
            const port = props.scan[portNumber];
            return (
              <Port
                portNumber={portNumber}
                state={port.State}
                protocol={port.Protocol}
                service={port.Service}
                key={portNumber}
              />
            );
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
      return <Nmap {...nmap} key={nmap._id} />;
    });
  }

  function addEntry() {
    setNmapList([...nmapList, { _id: Date.now(), scan: {} }]);
  }

  return (
    <div>
      <h3>Nmap List</h3>
      <button onClick={addEntry}>Add New Entry</button>
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

