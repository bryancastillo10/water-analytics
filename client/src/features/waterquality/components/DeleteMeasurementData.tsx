
interface DeleteMeasurementDataProps{
    id: string;
}

const DeleteMeasurementData = ({id}: DeleteMeasurementDataProps) => {
  return (
    <form>
        <h1>To Update Your Measurements Here</h1>
        <p>{id}</p>
    </form>
  )
}

export default DeleteMeasurementData
