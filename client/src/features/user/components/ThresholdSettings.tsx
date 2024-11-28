import TextHeader from "@/components/common/TextHeader"


const ThresholdSettings = () => {
  return (
    <section className="px-6 py-4">
          <TextHeader text="Threshold Settings" />
          <div className="w-fit grid grid-cols-3 gap-4">
              <p>Parameter</p>
              <p>Min Value</p>
              <p>Max Value</p>
          </div>
    </section>
  )
}

export default ThresholdSettings
