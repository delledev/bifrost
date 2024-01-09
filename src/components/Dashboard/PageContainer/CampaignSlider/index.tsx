import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CampaignSlider = ({ campaigns }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite
        swipeable
        draggable={true}
        showDots={false}
        arrows
        renderButtonGroupOutside
      >
        {campaigns.map((campaign) => (
          <div key={campaign.id} className=" relative">
            <div
              className="rounded-lg p-4 h-[170px] bg-cover bg-center flex flex-col justify-center items-center"
              style={{ backgroundImage: `url(${campaign.image})` }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
              <h3 className="text-2xl font-semibold text-white z-10">
                {campaign.title}
              </h3>
              <p className="text-white z-10 text-center">
                {campaign.description}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CampaignSlider;
