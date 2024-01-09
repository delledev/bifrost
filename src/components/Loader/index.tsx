import React from 'react';

type Props = {};

export function Loader({}: Props): JSX.Element {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="w-[60px] h-[60px]">
        <svg
          version="1.1"
          id="L5"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
        >
          <circle
            className="fill-black dark:fill-white"
            stroke="none"
            cx="6"
            cy="50"
            r="6"
          >
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 15 ; 0 -15; 0 15"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle
            className="fill-black dark:fill-white"
            stroke="none"
            cx="30"
            cy="50"
            r="6"
          >
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 10 ; 0 -10; 0 10"
              repeatCount="indefinite"
              begin="0.15"
            />
          </circle>
          <circle
            className="fill-black dark:fill-white"
            stroke="none"
            cx="54"
            cy="50"
            r="6"
          >
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
}
