import { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import PreviewContext from '../providers/PreviewProvider';

function Plots() {
  const previewContext = useContext(PreviewContext);
  return (
    <Grid container alignContent="center" alignItems="center">
      <Grid item xs={6} textAlign="center">
        <Button variant="outlined" onClick={() => previewContext.showChart('Scatter')}>
          Scatter Plot
        </Button>
      </Grid>
      <Grid item xs={6} textAlign="center">
        <Button variant="outlined" onClick={() => previewContext.showChart('PieChart')}>
          Pie Chart
        </Button>
      </Grid>
    </Grid>
  );
}

export default Plots;
