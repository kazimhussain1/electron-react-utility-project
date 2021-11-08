import { useContext } from 'react';
import { join } from 'path';
import { Backdrop, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Chart } from 'react-google-charts';
import DataContext from '../providers/DataProvider';
import ChartPreviewContext from '../providers/ChartPreviewProvider';
import PreviewContext from '../providers/PreviewProvider';
import PathContext from '../providers/PathProvider';

const pieChartOptions = {
  chartArea: { width: '100%', height: '100%', left: 50, top: 50, bottom: 20 },
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

const scatterChartOptions = {
  ...pieChartOptions,
  animation: null,
  pointSize: 8,
  dataOpacity: 0.8
};

function FullPageChartPreview() {
  const { chart, hideChart } = useContext(ChartPreviewContext);
  const { showPreview } = useContext(PreviewContext);
  const { workingDir, selectedFile } = useContext(PathContext);
  const data = useContext(DataContext).data || {};
  let { values } = data;
  const { min, max } = data;

  let chartOptions;
  if (values && chart) {
    if (chart.type === 'ScatterChart') {
      chartOptions = scatterChartOptions;
      values = values.map((element, i) => [
        i + 1,
        element[1],
        `Link # ${element[3]}\n Length: ${element[1]} in`
      ]);
      values.unshift([
        { label: 'Number', type: 'number' },
        { label: 'Length', type: 'number' },
        { role: 'tooltip', type: 'string' }
      ]);
    } else if (chart.type === 'PieChart') {
      chartOptions = scatterChartOptions;
      const range = max - min;

      const NUM_OF_GROUPS = 5;
      const ranges = new Array(NUM_OF_GROUPS).fill(0);

      ranges.forEach((v, i) => {
        ranges[i] = [min + (range * i) / NUM_OF_GROUPS, min + (range * (i + 1)) / NUM_OF_GROUPS];
      });

      ranges[NUM_OF_GROUPS - 1][1] = max;

      // const ranges = [
      //   [min, min + range * 0.25],
      //   [min + range * 0.25, min + range * 0.5],
      //   [min + range * 0.5, min + range * 0.75],
      //   [min + range * 0.75, max]
      // ];
      const groups = ranges.map((val) => [`${val[0]} - ${val[1]}`, 0]);
      // const groups = [
      //   [`${ranges[0][0]} - ${ranges[0][1]}`, 0],
      //   [`${ranges[1][0]} - ${ranges[1][1]}`, 0],
      //   [`${ranges[2][0]} - ${ranges[2][1]}`, 0],
      //   [`${ranges[3][0]} - ${ranges[3][1]}`, 0]
      // ];

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
      console.log(values);
    }
  }

  const chartEvents = [
    {
      eventName: 'select',
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        console.log(selection);
        if (selection.length === 1) {
          const [selectedItem] = selection;
          // const dataTable = chartWrapper.getDataTable();

          const { row } = selectedItem;

          showPreview(
            `atom://${join(
              workingDir,
              selectedFile.replace('.csv', ''),
              `boo2_${values[row + 1][0]}.png`
            )}`
          );
        }
      }
    }
  ];

  const handleClose = () => {
    hideChart();
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={chart != null}
    >
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ color: (theme) => theme.palette.common.white }} />
        </IconButton>
      </Box>
      {chart && (
        <Box sx={{ width: '90%', position: 'absolute' }}>
          <Chart
            width="100%"
            chartType={chart.type}
            data={values}
            options={chartOptions}
            chartEvents={chart.type === 'ScatterChart' && chartEvents}
          />
        </Box>
      )}
    </Backdrop>
  );
}

export default FullPageChartPreview;
