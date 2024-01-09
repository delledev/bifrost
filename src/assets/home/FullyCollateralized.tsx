function FullyCollateralized(props) {
  return (
    <svg
      width="80"
      height="50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.5 11.5v27.1753L44 47.4517l19.5-8.7764V11.5h-39z"
        fill="url(#paint0_linear_fully)"
        stroke="url(#paint1_linear_fully)"
      />
      <path
        d="M24 8.2904h-.5V3.5h-7v27.1753L36 39.4517l19.5-8.7764V3.5h-7v4.7904h-9V3.5h-7v4.7904H24z"
        fill="url(#paint2_linear_fully)"
        stroke="url(#paint3_linear_fully)"
      />
      <path
        d="M24 11v23.614L36 40l20-9V11H24z"
        fill="url(#paint4_radial_fully)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_fully"
          x1="44"
          y1="11"
          x2="44"
          y2="51"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002EFF" />
          <stop offset="1" stopColor="#002EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_fully"
          x1="34"
          y1="47.4072"
          x2="50.3584"
          y2="15.2104"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002EFF" />
          <stop offset="1" stopColor="#002EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_fully"
          x1="36"
          y1="3"
          x2="36"
          y2="43"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F80196" />
          <stop offset="1" stopColor="#F80196" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_fully"
          x1="50.5"
          y1="36.0539"
          x2="22.9102"
          y2="2.7885"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F80196" />
          <stop offset="1" stopColor="#F80196" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint4_radial_fully"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-31.0001 -19.4999 21.08094 -33.51358 56 31)"
        >
          <stop stopColor="#FFE600" />
          <stop offset="1" stopColor="#FF4D00" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default FullyCollateralized;
