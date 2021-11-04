import { useEffect, useState, useContext } from 'react';
import {
  Button,
  Grid,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Box
} from '@mui/material';

import ProgressbarContext from './providers/ProgressbarContext';
import Stats from './Stats';
import Graph from './components/Graph';
import Plots from './components/Plots';

const fs = window.require('fs');
// const {dialog} = window.require("electron");

function Home() {
  const progressbarContext = useContext(ProgressbarContext);

  const [workingDir, setWorkingDir] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  console.log(selectedFile);

  const getFiles = (path) => {
    if (path || workingDir) {
      fs.readdir(path || workingDir, (err, result) => {
        result = result.filter((file) => file.endsWith('.csv'));
        setFiles(result);
      });
    }
  };
  useEffect(() => {
    window.ipcRenderer.on('select-dirs-result', (evt, message) => {
      setWorkingDir(message.path[0]);
      setSelectedFile('');
      getFiles(message.path[0]);
      progressbarContext.hideProgressbar();
    });
  }, []);

  const handleSelectDirectory = () => {
    window.postMessage({
      type: 'select-dirs'
    });
    progressbarContext.showProgressbar();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.value);

    window.ipcRenderer.send('load-data', { path: `${workingDir}\\${e.target.value}` });
    progressbarContext.showProgressbar();
  };

  const DirectoryButton = () => (
    <Button variant="contained" sx={{ minWidth: 180 }}>
      Select Directory
    </Button>
  );
  return (
    <Grid container spacing={2} style={{ padding: 32 }}>
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center">
          Size Utility
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="directory"
          placeholder="Working Directory"
          value={workingDir}
          InputProps={{ endAdornment: <DirectoryButton /> }}
          onClick={handleSelectDirectory}
          sx={{ width: '100%' }}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="files-label">Files</InputLabel>
          <Select
            labelId="files-label"
            id="files"
            label="Files"
            value={selectedFile}
            onChange={(e) => handleFileChange(e)}
            disabled={workingDir === ''}
          >
            {files.map((file) => (
              <MenuItem key={file} value={file}>
                {file.replace('.csv', '')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {selectedFile !== '' && (
        <>
          <Grid item xs={12} sx={{ paddingBottom: 5 }}>
            <Stats />
          </Grid>

          <Grid item xs={12} sx={{ paddingBottom: 5 }}>
            <Plots />
          </Grid>

          <Grid item xs={12}>
            <Graph workingDirectory={workingDir} selectedFile={selectedFile} />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Home;
