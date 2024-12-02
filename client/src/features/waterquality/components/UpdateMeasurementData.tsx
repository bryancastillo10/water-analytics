
interface UpdateMeasurementProps{
    id: string;
}

const UpdateMeasurementData = ({id}:UpdateMeasurementProps) => {
  return (
    <div>
      <h1>To Update Your Measurements Here</h1>
          <p>{id}</p>
    </div>
  )
}

export default UpdateMeasurementData;