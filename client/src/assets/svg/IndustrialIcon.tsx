import type { SVGAssetProps } from '@/assets/svg';

const IndustrialIcon = ({ fill }: SVGAssetProps) => {
  return (
    <svg
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 32 32"
      width="20px"
      height="20px"
      fill={fill}
    >
      <path
        d="M29.7,23.3L28,21.6V20c0-3.3-1.3-6.2-3.5-8.5L23,18.2c-0.1,0.5-0.5,0.8-1,0.8c-0.1,0-0.1,0-0.2,0c-0.5-0.1-0.9-0.7-0.8-1.2
	l2-8.9c0-0.3-0.2-0.7-0.5-0.8c-4-2-8.9-2-12.9,0C9.2,8.3,9,8.6,9,8.9l2,8.9c0.1,0.5-0.2,1.1-0.8,1.2c-0.1,0-0.1,0-0.2,0
	c-0.5,0-0.9-0.3-1-0.8l-1.5-6.7C5.3,13.8,4,16.7,4,20v1.6l-1.7,1.7C2,23.6,1.9,24,2.1,24.4C2.2,24.8,2.6,25,3,25h26
	c0.4,0,0.8-0.2,0.9-0.6C30.1,24,30,23.6,29.7,23.3z"
      ></path>
    </svg>
  );
};

export default IndustrialIcon;
