import Chart from "react-google-charts";


// const pieData = [
//   ['Task', 'Reference per side'],
//   ['Root/Master', root],
//   ['Reference-1', ref1Count],
//   ['Reference-2', ref2Count],
//   ['Reference-1 Foreign',ref1ForeignCount],
//   ['Reference-2 Foreign', ref2ForeignCount],
// ]
 

export default function ChartPage({ConsumerDetails}) {

  const root = ConsumerDetails?.me?.consumers?.consumerreftree?.rootCount
  const ref1ForeignCount = ConsumerDetails?.me?.consumers?.consumerreftree?.ref1ForeignCount
  const ref2ForeignCount = ConsumerDetails?.me?.consumers?.consumerreftree?.ref2ForeignCount
  const ref1Count = ConsumerDetails?.me?.consumers?.consumerreftree?.ref1Count - ref1ForeignCount
  const ref2Count = ConsumerDetails?.me?.consumers?.consumerreftree?.ref2Count - ref2ForeignCount
 
  return (
    <>

      {/* <h1> 3D Pie Chart for Student marks in subjects </h1> */}
      <Chart
        minWidth={'300px'}
        height={'270px'}
        padding={'10px'}
        chartType="PieChart"
        loader={<div>Loading Pie Chart</div>}
        style={{fontSize:'16px'}}
        data={
          [
            ['Task', 'Reference per side'],
            ['Root/Master', root],
            ['Reference-1', ref1Count],
            ['Reference-2', ref2Count],
            ['Reference-1 Foreign',ref1ForeignCount],
            ['Reference-2 Foreign', ref2ForeignCount],
          ]
        }
        options={{
          title: 'Left-Right consumer percentage',
          is3D: true,
        }}
      />

    </>
  );
}
