
interface DeleteSiteFormProps{
  id: string;
}

const DeleteSiteForm = ({id}:DeleteSiteFormProps) => {
  return (
    <div>
      <h1>Delete Site Here</h1>
      <p>Show id: {id}</p>
    </div>
  )
}

export default DeleteSiteForm
