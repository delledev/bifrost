function Synths(props) {
  return (
    <svg
      width="80"
      height="50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.8673 45.8182L40.5 4.9979l23.6328 40.8203H16.8673z"
        fill="url(#paint0_linear_synth)"
        stroke="url(#paint1_linear_synth)"
      />
      <path
        fill="url(#paint2_radial_synth)"
        stroke="url(#paint3_radial_synth)"
        d="M29.27 24.799h21.0801v21.0192H29.27z"
      />
      <path
        d="M48.9701 35.3086c0 5.0429-4.0998 9.1334-9.16 9.1334-5.0603 0-9.1601-4.0905-9.1601-9.1334 0-5.043 4.0998-9.1334 9.1601-9.1334 5.0602 0 9.16 4.0904 9.16 9.1334z"
        fill="url(#paint4_linear_synth)"
        stroke="url(#paint5_linear_synth)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_synth"
          x1="40.5"
          y1="3.6559"
          x2="41.1862"
          y2="47.0063"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F80196" />
          <stop offset="1" stopColor="#F80196" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_synth"
          x1="18.4199"
          y1="45.6301"
          x2="58.4295"
          y2="36.6376"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F80196" />
          <stop offset="1" stopColor="#F80196" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_synth"
          x1="39.8101"
          y1="25.6752"
          x2="39.8101"
          y2="44.942"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002EFF" />
          <stop offset="1" stopColor="#002EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_synth"
          x1="48.7801"
          y1="40.1253"
          x2="33.6267"
          y2="29.7648"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#002EFF" />
          <stop offset="1" stopColor="#002EFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint2_radial_synth"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(42.432 -17.4221 50.3662) scale(21.1168 21.1117)"
        >
          <stop stopColor="#FFE600" />
          <stop offset="1" stopColor="#FF4D00" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_synth"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-13.63776 -14.24768 14.24949 -13.63949 50.8501 45.0229)"
        >
          <stop stopColor="#FF4D00" />
          <stop offset="1" stopColor="#FFE600" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default Synths;
