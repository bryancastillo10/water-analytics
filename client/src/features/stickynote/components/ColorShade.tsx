interface ColorShadeProps<T>{
  color: {
      id: T;
      colorHeader: T;
      colorBody: T;
      colorText:T
  }
}

const ColorShade = ({ color }: ColorShadeProps<string>) => {
  return (
    <div
      className="size-10 my-1 rounded-full cursor-pointer hover:scale-110 duration-150 ease-out"
      style={{ backgroundColor: color.colorHeader }}
    />
  )
}

export default ColorShade;
