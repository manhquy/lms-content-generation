import * as React from 'react';
const ChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    viewBox='0 0 20 20'
    {...props}
  >
    <path
      stroke='#2D286B'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M15.833 2.5H4.167c-.92 0-1.667.746-1.667 1.667v11.666c0 .92.746 1.667 1.667 1.667h11.666c.92 0 1.667-.746 1.667-1.667V4.167c0-.92-.746-1.667-1.667-1.667ZM7.5 6.667h5.833M6.667 10h5m-2.5 3.333h4.166'
    />
  </svg>
);
export default ChartIcon;
