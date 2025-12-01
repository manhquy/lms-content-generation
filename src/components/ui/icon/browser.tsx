import * as React from 'react';
const BrowserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    fill='none'
    {...props}
  >
    <path
      stroke='#2D286B'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M17.709 5.625v1.808H2.292V5.625c0-1.383 1.117-2.5 2.5-2.5H15.21c1.383 0 2.5 1.117 2.5 2.5ZM17.709 7.434v6.942c0 1.383-1.117 2.5-2.5 2.5H4.792a2.497 2.497 0 0 1-2.5-2.5V7.434H17.71Z'
    />
    <path
      fill='#2D286B'
      d='M4.859 6.108a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667Z'
    />
  </svg>
);
export default BrowserIcon;
