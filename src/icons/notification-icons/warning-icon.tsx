//types
import { IIconPropsType } from '../../types';

const WarningIcon = ({ color, size }: IIconPropsType): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={size ? size.height : 40}
      width={size ? size.width : 40}
    >
      <path
        fill={color ? color : 'currentColor'}
        d="m40-120 440-760 440 760H40Zm115.333-66.666h649.334L480-746.667 155.333-186.666ZM482.784-238q14.216 0 23.716-9.617 9.5-9.617 9.5-23.833 0-14.216-9.617-23.716-9.617-9.5-23.833-9.5-14.217 0-23.716 9.617-9.5 9.617-9.5 23.833 0 14.216 9.617 23.716 9.616 9.5 23.833 9.5Zm-33.45-114H516v-216h-66.666v216ZM480-466.667Z"
      />
    </svg>
  );
};

export default WarningIcon;
