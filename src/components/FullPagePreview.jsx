import { useContext } from 'react';
import { Backdrop, IconButton, Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Chart } from 'react-google-charts';
import PreviewContext from '../providers/PreviewProvider';
import DataContext from '../providers/DataProvider';

const chartOptions = {
  chartArea: { width: '100%', height: '100%' },
  height: 500,
  vAxis: {
    textStyle: {
      fontSize: 20
    }
  },
  hAxis: {
    baselineColor: 'none',
    ticks: []
  },
  tooltip: {
    textStyle: { fontSize: '20' }
  },
  animation: {
    duration: 1000,
    easing: 'inAndOut',
    startup: true
  },
  is3D: true
};

function FullPagePreview() {
  const { imgUrl, hidePreview, chart, hideChart } = useContext(PreviewContext);
  const data = useContext(DataContext).data || {};
  let { values } = data;
  const { min, max } = data;

  if (values && chart) {
    if (chart.type === 'Scatter') {
      values = values.map((element, i) => [i + 1, element[1]]);
      values.unshift([
        { label: 'Number', type: 'number' },
        { label: 'Length', type: 'number' }
      ]);
    } else if (chart.type === 'PieChart') {
      const range = max - min;
      const ranges = [
        [min, min + range * 0.25],
        [min + range * 0.25, min + range * 0.5],
        [min + range * 0.5, min + range * 0.75],
        [min + range * 0.75, max]
      ];

      const groups = [
        [`${ranges[0][0]} - ${ranges[0][1]}`, 0],
        [`${ranges[1][0]} - ${ranges[1][1]}`, 0],
        [`${ranges[2][0]} - ${ranges[2][1]}`, 0],
        [`${ranges[3][0]} - ${ranges[3][1]}`, 0]
      ];

      for (let i = 0; i < values.length; i++) {
        const val = values[i][1];
        for (let j = 0; j < groups.length; j++) {
          if (val >= ranges[j][0] && val <= ranges[j][1]) {
            groups[j][1] += 1;
            break;
          }
        }
      }
      values = [['Range', 'Count'], ...groups];
    }
    console.log(values);
  }

  const handleClose = () => {
    hidePreview();
    hideChart();
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={imgUrl !== null || chart != null}
      onClick={handleClose}
    >
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <IconButton>
          <CloseIcon sx={{ color: (theme) => theme.palette.common.white }} />
        </IconButton>
      </Box>
      <img width="80%" src={imgUrl} alt="" />
      {chart && (
        <Box sx={{ width: '90%', position: 'absolute' }}>
          <Chart width="100%" chartType={chart.type} data={values} options={chartOptions} />
        </Box>
      )}
    </Backdrop>
  );
}

export default FullPagePreview;
