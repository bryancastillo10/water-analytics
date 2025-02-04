

const GaugeCard = () => {
  return (
    <div className="grid grid-cols-5 h-[120px] border border-dark">
          <div className="col-span-3 bg-teal-500">
              <h1 className="flex justify-center items-center h-full">
                  Gauge Chart Here
              </h1>
          </div>
          <div className="col-span-2 bg-indigo-400">
              <h1 className="font-medium text-center p-4 text-xl">Ammonia</h1>
              
              <p className="text-center text-lg font-bold">PASS</p>
          
          </div>
    </div>
  )
}

export default GaugeCard;
