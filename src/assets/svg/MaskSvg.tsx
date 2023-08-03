import { theme } from "antd";
import type React from "react";

const { useToken } = theme;

function MaskSvg(props: React.SVGProps<SVGSVGElement>) {
  const { token } = useToken();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 60"
      preserveAspectRatio="none"
      {...props}
    >
      <defs>
        <linearGradient id="Gradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={token.colorBgBase} stopOpacity="0.9" />
          <stop offset="100%" stopColor={token.colorBgBase} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path
        d="M0 0H40v60H0V1H1V57A2 2 0 003 59H37A2 2 0 0039 57V10A2 2 0 0037 8H30A2 2 0 0128 6V3A2 2 0 0026 1H3A2 2 0 001 3H0Z"
        fill="url(#Gradient)"
      />
    </svg>
  );
}

export default MaskSvg;
