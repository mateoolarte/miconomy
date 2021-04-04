import { ResponsivePie } from '@nivo/pie';

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 0, right: 50, bottom: 10, left: 50 }}
    innerRadius={0.5}
    padAngle={1}
    cornerRadius={2}
    colors={{ datum: 'data.color' }}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    sliceLabelsTextColor={{
      from: 'color',
      modifiers: [['darker', 1.8]],
    }}
    sliceLabel={d => `${d.label}`}
    enableSliceLabels={true}
    enableRadialLabels={false}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        symbolSize: 18,
        symbolShape: 'circle',
        itemOpacity: 0,
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsivePie;
