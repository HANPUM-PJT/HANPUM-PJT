import { SVGProps } from 'react';
import * as icon from '../../../assets/icons/index';

type IconNameType = keyof typeof icon;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconNameType;
  size?: number;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

const DEFAULT_SIZE = 24;

export default function Icon({
  name,
  size,
  width,
  height,
  style,
  ...rest
}: IconProps) {
  const SVGIcon = icon[name];

  return (
    <SVGIcon
      {...rest}
      style={{
        ...style,
        width: width ?? `${size}px`,
        height: height ?? `${size}px`,
      }}
    />
  );
}
