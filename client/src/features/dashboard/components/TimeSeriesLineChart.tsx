const TimeSeriesLineChart = () => {
  return (
    <div className="col-span-1 xl:col-span-2 h-[350px] bg-teal-500">
        <div className="flex flex-col odd:justify-center items-center h-full">
          <h1 className="text-2xl">Time Series Area Chart</h1>
          <p className="text-center">
            pH, Temperature, DO, COD, Suspended Solids over Time
          </p>
        </div>
    </div>
  )
}

export default TimeSeriesLineChart;
