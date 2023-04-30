import React from "react";
import axios from "axios";

const ImportNmapButton = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImport = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("/api/import-nmap", formData)
      .then((response) => {
        console.log(response.data);
        alert("Nmap scan has been imported successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Error importing nmap scan!");
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleImport}>Import Nmap Scan</button>
    </div>
  );
};

export default ImportNmapButton;
