function ConstantYield(props) {
  return (
    <svg
      width="80"
      height="50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="a" fill="#fff">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M63 6H53v38h10V6zM35 20h10v24H35V20zM17 32h10v12H17V32z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63 6H53v38h10V6zM35 20h10v24H35V20zM17 32h10v12H17V32z"
        fill="url(#paint0_linear_yield)"
      />
      <path
        d="M53 6V5h-1v1h1zm10 0h1V5h-1v1zM53 44h-1v1h1v-1zm10 0v1h1v-1h-1zM45 20h1v-1h-1v1zm-10 0v-1h-1v1h1zm10 24v1h1v-1h-1zm-10 0h-1v1h1v-1zm-8-12h1v-1h-1v1zm-10 0v-1h-1v1h1zm10 12v1h1v-1h-1zm-10 0h-1v1h1v-1zM53 7h10V5H53v2zm1 37V6h-2v38h2zm9-1H53v2h10v-2zM62 6v38h2V6h-2zM45 19H35v2h10v-2zm1 25V20h-2v24h2zm-11 1h10v-2H35v2zm-1-25v24h2V20h-2zm-7 11H17v2h10v-2zm1 13V32h-2v12h2zm-11 1h10v-2H17v2zm-1-13v12h2V32h-2z"
        fill="url(#paint1_radial_yield)"
        mask="url(#a)"
      />
      <path
        d="M35.5 43.5V30.8385l9-3.6V43.5h-9z"
        fill="url(#paint2_linear_yield)"
        stroke="url(#paint3_linear_yield)"
      />
      <path
        d="M17.5 43.5v-5.6615l9-3.6V43.5h-9z"
        fill="url(#paint4_linear_yield"
        stroke="url(#paint5_linear_yield)"
      />
      <path
        d="M53.5 43.5V23.3385l9-3.6V43.5h-9z"
        fill="url(#paint6_linear_yield)"
        stroke="url(#paint7_linear_yield)"
      />
      <path d="M17 37.5L63 19" stroke="url(#paint8_linear_yield)" />
      <defs>
        <linearGradient
          id="paint0_linear_yield"
          x1="55"
          y1="6"
          x2="55"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002EFF" />
          <stop offset="1" stopColor="#002EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_yield"
          x1="40.5"
          y1="21"
          x2="39.6685"
          y2="43.825"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F80196" stopOpacity="0" />
          <stop offset="1" stopColor="#F80196" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_yield"
          x1="44"
          y1="44"
          x2="44"
          y2="36.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4D00" />
          <stop offset="1" stopColor="#FFE600" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_yield"
          x1="22.5"
          y1="33"
          x2="21.8704"
          y2="43.8714"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F80196" stopOpacity="0" />
          <stop offset="1" stopColor="#F80196" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_yield"
          x1="26"
          y1="44"
          x2="26"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4D00" />
          <stop offset="1" stopColor="#FFE600" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_yield"
          x1="58"
          y1="13.0789"
          x2="58.0498"
          y2="43.6718"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F80196" stopOpacity="0" />
          <stop offset="1" stopColor="#F80196" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_yield"
          x1="58"
          y1="44"
          x2="58"
          y2="28.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4D00" />
          <stop offset="1" stopColor="#FFE600" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_yield"
          x1="17"
          y1="37"
          x2="63"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F80196" />
          <stop offset="1" stopColor="#F80196" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_yield"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-45.49972 37.50041 -45.39521 -55.07859 63 6)"
        >
          <stop stopColor="#002EFF" />
          <stop offset="1" stopColor="#002EFF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default ConstantYield;
