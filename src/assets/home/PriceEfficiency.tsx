const PriceEfficiency = (props) => {
  return (
    <svg
      width="80"
      height="50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M17.5 42.5v-35h44v35h-44z" fill="url(#paint0_radial_price)" />
      <path d="M17.5 42.5v-35h44v35h-44z" stroke="url(#paint1_radial_price)" />
      <path d="M17.5 42.5v-35h44v35h-44z" stroke="url(#paint2_radial_price)" />
      <path
        d="M17.5 7.5s.227 10.4054 8.5 20.128"
        stroke="url(#paint3_linear_price)"
      />
      <path
        d="M61.5 42.5s-9.3598.5-19.6639-3.688c-3.3389-1.357-6.7243-3.1538-9.8361-5.5327"
        stroke="url(#paint4_linear_price)"
      />
      <circle
        cx="28.5"
        cy="30.5"
        r="4"
        fill="url(#paint5_linear_price)"
        stroke="url(#paint6_radial_price)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_price"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(34.02743 -30.5 38.60397 43.06866 19.4725 43)"
        >
          <stop stopColor="#002EFF" />
          <stop offset="1" stopColor="#002EFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_price"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(8.49999 12.49999 -15.62502 10.62502 17.5 8)"
        >
          <stop stopColor="#F80196" />
          <stop offset="1" stopColor="#F80196" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_price"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-26.99997 -.50004 .62505 -33.75001 61.5 42.5)"
        >
          <stop stopColor="#F80196" />
          <stop offset="1" stopColor="#F80196" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint6_radial_price"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(6 -5 5 6 26 33)"
        >
          <stop stopColor="#FF4D00" />
          <stop offset="1" stopColor="#FFE600" />
        </radialGradient>
        <linearGradient
          id="paint3_linear_price"
          x1="20"
          y1="15.5"
          x2="26.5"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F80196" />
          <stop offset="1" stopColor="#FFBF01" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_price"
          x1="31.5"
          y1="32.5"
          x2="49"
          y2="41"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB301" />
          <stop offset="1" stopColor="#F80196" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_price"
          x1="28.5"
          y1="26"
          x2="28.5"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE600" />
          <stop offset="1" stopColor="#FF4D00" stopOpacity=".44" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PriceEfficiency;
