import React from 'react';
import CreateNmap from './createNmap';
import NmapList from './nmapList';

function NmapPage() {
  return (
    <div>
      <h1>Nmap Page</h1>
      <CreateNmap />
      <hr />
      <NmapList />
    </div>
  );
}

export default NmapPage;
