
interface UpdateSiteFormProps{
  id: string;
}

const UpdateSiteForm = ({ id }: UpdateSiteFormProps) => {

  return (
    <div>
      <h1>Update Site Here</h1>
      <p>Show id: {id}</p>
    </div>
  )
}

export default UpdateSiteForm;
