// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine, ResponsiveLineCanvas } from '@nivo/line';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }: { data: any }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
    xScale={{ type: 'linear' }}
    yScale={{ type: 'linear', stacked: false, min: 0, max: 1000 }}
    yFormat=' >-.2f'
    curve='monotoneX'
    axisTop={{
      tickValues: [],
      format: '.2s',
      legend: 'Sensor 0',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    axisRight={null}
    axisBottom={{
      tickValues: [0, 20, 40, 60, 80, 100, 120],
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: '.2f',
      legend: 'time (ms)',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      tickValues: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: '.2s',
      legend: 'force (N)',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    enableGridX={false}
    colors={{ scheme: 'spectral' }}
    lineWidth={1}
    pointSize={4}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={1}
    pointBorderColor={{ from: 'serieColor' }}
    // pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    // useMesh={true}
    gridXValues={[0, 20, 40, 60, 80, 100, 120]}
    gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 140,
        translateY: 0,
        itemsSpacing: 2,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 12,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveLine;
