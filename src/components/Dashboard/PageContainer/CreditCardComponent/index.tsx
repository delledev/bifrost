import { FormatCardNumberPublic } from 'components/Popups/AdminShowCardsPopup';
import { Card } from 'libs/types/card';
import React from 'react';

type CreditCardProps = {
  creditCard:Card
}

const CreditCardForm = (props:CreditCardProps) => {
  return (
    <div className="items-center flex h-full w-full">
      <div className=" bg-gradient-to-br from-red-700 to-red-900 text-white rounded-lg absolute p-[8px] w-[430px] h-[250px]">
        <img
          className="absolute top-[20px] left-[20px] w-[35px] h-[35px]"
          src="/svg/chip.png"
        ></img>
        <div className="absolute mb-[8px] top-[9px] w-[60px] right-[20px]">
          <svg
            version="1.1"
            id="visa"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="47.834px"
            height="47.834px"
            viewBox="0 0 47.834 47.834"
          >
            <g>
              <path
                fill="#FFFF"
                d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                                c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                                c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                                M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                                c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                                c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                                l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                                C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                                C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                                c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                                h-3.888L19.153,16.8z"
              />
            </g>
          </svg>
        </div>
        <div className="absolute  top-[103px] left-[19px] text-3xl">
          {FormatCardNumberPublic( props.creditCard.number)}
        </div>
        <div className="card-holder absolute top-[180px] left-[19px] capitalize text-gray-200">
          <label>Card holder</label>
          <div className="text-white">{props.creditCard.firstName} {props.creditCard.lastName}</div>
        </div>
        <div className="absolute right-[20px] top-[180px] text-sm text-right">
          <label className="text-gray-200">Expires</label>
          <div className="text-white">{props.creditCard.expireMonth}/{props.creditCard.expireYear.slice(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;