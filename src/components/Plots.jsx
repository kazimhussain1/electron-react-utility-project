import { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import ChartPreviewContext from '../providers/ChartPreviewProvider';

function Plots() {
  const previewContext = useContext(ChartPreviewContext);
  return (
    <Grid container alignContent="center" alignItems="center">
      <Grid item xs={6} textAlign="center">
        <Button variant="outlined" onClick={() => previewContext.showChart('ScatterChart')}>
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
