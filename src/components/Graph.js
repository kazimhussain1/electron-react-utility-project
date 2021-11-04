import React, { useContext, useState, useMemo, useRef } from 'react';
import { Grid, Slider, Typography, Box, CircularProgress } from '@mui/material';
import { join } from 'path';
import { Chart } from 'react-google-charts';
import DataContext from '../providers/DataProvider';
import PreviewContext from '../providers/PreviewProvider';

// ['Element', 'Length', { role: 'style' }],
//   ['6.128', 6.128, '#b87333'],

const colors = ['#b87333', 'silver', 'gold', 'color: #e5e4e2'];

const chartOptions = {
  chartArea: { left: 50, top: 50, width: '100%', height: '80%' },
  height: 400,
  bar: { groupWidth: '80%' },
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
    duration: 300,
    easing: 'inAndOut',
    startup: true
  }
};

function CustomChart({ data, workingDirectory, selectedFile, sliderValue, chartEvents, total }) {
  return useMemo(
    () => (
      <Chart
        chartType="ColumnChart"
        width={`${700}%`}
        data={data}
        disableSwap
        loader={<CircularProgress />}
        options={{
          ...chartOptions,
          chartArea: {
            left: 50,
            top: 50,
            width: `${100 * ((data.length - 1) / total)}%`,
            height: '80%'
          }
        }}
        chartEvents={chartEvents}
      />
    ),
    [workingDirectory, selectedFile, data, sliderValue]
  );
}

function SliderComponent({ min, max, onChange }) {
  const [sliderValueTemp, setSliderValueTemp] = useState([min, max]);

  if (
    sliderValueTemp[0] === undefined &&
    sliderValueTemp[1] === undefined &&
    min !== undefined &&
    max !== undefined
  ) {
    setSliderValueTemp([min, max]);
  }

  const marks = [
    {
      value: min,
      label: `${min} in`
    },
    {
      value: max,
      label: `${max} in`
    }
  ];

  const handleChange = (event, newValue) => {
    setSliderValueTemp(newValue);
  };
  return (
    <Slider
      getAriaLabel={() => 'Length Range'}
      value={sliderValueTemp}
      onChange={handleChange}
      onChangeCommitted={onChange}
      valueLabelDisplay="auto"
      min={min}
      max={max}
      step={0.001}
      marks={marks}
    />
  );
}

function Graph({ workingDirectory, selectedFile }) {
  const chartContainerRef = useRef(null);
  const { showPreview } = useContext(PreviewContext);
  const { values, min, max } = useContext(DataContext).data || {};

  const [sliderValue, setSliderValue] = useState([min, max]);

  if (
    sliderValue[0] === undefined &&
    sliderValue[1] === undefined &&
    min !== undefined &&
    max !== undefined
  ) {
    setSliderValue([min, max]);
  }

  let data;
  if (values) {
    data = values
      .filter((element) => element[1] >= sliderValue[0] && element[1] <= sliderValue[1])
      .map((element, i) => [i + 1, element[1], colors[i % 4], element[3]]);

    data.unshift([
      { label: 'Length', type: 'number' },
      { label: 'Length', type: 'number' },
      { role: 'style' },
      { role: 'style' }
    ]);
  }

  const chartEvents = [
    {
      eventName: 'select',
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length === 1) {
          const [selectedItem] = selection;
          // const dataTable = chartWrapper.getDataTable();

          const { row } = selectedItem;

          console.log(
            workingDirectory,
            selectedFile.replace('.csv', ''),
            `boo2_${data[row + 1][3]}.png`
          );
          showPreview(
            `atom://${join(
              workingDirectory,
              selectedFile.replace('.csv', ''),
              `boo2_${data[row + 1][3]}.png`
            )}`
          );
        }
      }
    }
  ];

  const commitChange = (event, newValue) => {
    setSliderValue(newValue);

    chartContainerRef.current.scrollTo({ left: 0 });
  };

  return values ? (
    <Grid container>
      <Grid container item xs={12} spacing={4}>
        <Grid item xs="auto">
          <Typography variant="h6">Range</Typography>
        </Grid>
        <Grid item xs>
          <SliderComponent min={min} max={max} onChange={commitChange} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box ref={chartContainerRef} sx={{ overflowX: 'scroll', overflowY: 'hidden' }}>
          <CustomChart
            data={data}
            workingDirectory={workingDirectory}
            selectedFile={selectedFile}
            total={values.length}
            sliderValue={sliderValue}
            chartEvents={chartEvents}
          />
        </Box>
      </Grid>
    </Grid>
  ) : (
    <Box />
  );
}

export default Graph;
