function Graph(props) {
  return (
    <svg
      width="270"
      height="135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M198.44 108.5V34.5C147.44 34.5 140.44 108.5 63.4399 108.5H90.1899H116.94H198.44Z"
        fill="url(#paint0_linear_graph)"
      />
      <path
        d="M116.94 108.5H90.1899M90.1899 108.5C90.1899 108.5 -13.5601 108.5 63.4399 108.5C140.44 108.5 147.44 34.5 198.44 34.5V108.5H90.1899Z"
        stroke="url(#paint1_linear_graph)"
        strokeWidth="2"
      />
      <path
        d="M63.4399 108.5C140.44 108.5 147.44 34.5 198.44 34.5"
        stroke="url(#paint2_linear_graph)"
        strokeWidth="2"
      />
      <path
        d="M90.1899 108.5H116.94H139.727V72.5C122.177 90.6607 101.246 108.5 63.4399 108.5H90.1899Z"
        fill="url(#paint3_radial_graph)"
      />
      <path
        d="M116.94 108.5H90.1899M90.1899 108.5C90.1899 108.5 -13.5601 108.5 63.4399 108.5C101.246 108.5 122.177 90.6607 139.727 72.5V108.5H90.1899Z"
        stroke="url(#paint4_radial_graph)"
        strokeWidth="2"
      />
      <path
        d="M116.94 108.5H90.1899M90.1899 108.5C90.1899 108.5 -13.5601 108.5 63.4399 108.5C101.246 108.5 122.177 90.6607 139.727 72.5V108.5H90.1899Z"
        stroke="url(#paint5_linear_graph)"
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_graph"
          x1="60.5"
          y1="109"
          x2="165.5"
          y2="109"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002EFF" />
          <stop offset="1" stopColor="#002EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_graph"
          x1="70.5"
          y1="109"
          x2="174"
          y2="83.5001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002EFF" />
          <stop offset="1" stopColor="#002EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_graph"
          x1="63"
          y1="109"
          x2="198"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE600" stopOpacity="0" />
          <stop offset=".3854" stopColor="#FF4D00" />
          <stop offset=".974" stopColor="#002EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_graph"
          x1="63"
          y1="109"
          x2="111"
          y2="103.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE600" />
          <stop offset="1" stopColor="#FF4D00" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint3_radial_graph"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(55.49995 -12.50002 20.45462 90.81824 82 109)"
        >
          <stop stopColor="#F80196" />
          <stop offset="1" stopColor="#F80196" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_graph"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(116.4998 -29.00002 84.3637 338.90858 71 109)"
        >
          <stop stopColor="#F80196" />
          <stop offset=".5114" stopColor="#F80196" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default Graph;
