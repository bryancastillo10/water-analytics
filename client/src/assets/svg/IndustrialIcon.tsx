import type { SVGAssetProps } from "@/assets/svg";

const IndustrialIcon = ({fill}:SVGAssetProps) => {
  return (
      <svg
          version="1.1"
          id="Icons"
          x="0px" y="0px" viewBox="0 0 32 32"
          fill={fill}
        >
        <g>
        <path d="M18.8,25c-0.5,0.5-0.8,1.2-0.8,2v2c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1v-2c0-0.8-0.3-1.5-0.8-2H18.8z"></path>
        <path d="M13.2,7C13.7,6.5,14,5.8,14,5V3c0-0.6-0.4-1-1-1H3C2.4,2,2,2.4,2,3v2c0,0.8,0.3,1.5,0.8,2H13.2z"></path>
        <path d="M18.7,20h1.1c0.1,0,0.2,0.1,0.2,0.2V23h8v-4c0-3.9-3.1-7-7-7h-2.3c-0.3-0.6-1-1-1.7-1h-2c-0.7,0-1.4,0.4-1.7,1h-1.1
            c-0.1,0-0.2-0.1-0.2-0.2V9H4v4c0,3.9,3.1,7,7,7h2.3c0.3,0.6,1,1,1.7,1h2C17.7,21,18.4,20.6,18.7,20z"></path>
        </g>
    </svg>
  )
}

export default IndustrialIcon;
