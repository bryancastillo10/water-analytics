interface TextHeaderProps{
    text: string;
}

const TextHeader = ({text}:TextHeaderProps) => {
  return (
    <div className="inline-block my-2">
          <h1 className="text-2xl text-dark font-bold tracking-widest mb-2">{text}</h1>
          <hr className="border border-neutral" />
    </div>
  )
}

export default TextHeader;
