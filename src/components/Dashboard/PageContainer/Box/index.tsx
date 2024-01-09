import { useEffect, useState } from 'react';
import CampaignSlider from '../CampaignSlider';
import CreditCard from '../CreditCard';
import CurrencyTable from '../CurrencyTable';
import TransactionHistory from '../TransactionHistory';
import { User } from 'libs/types/user';
import { Card } from 'libs/types/card';
import CreditCardComponent from '../CreditCardComponent';
type InfoBoxProps = {
  currentUser: User;
};

const InfoBox: React.FC<InfoBoxProps> = ({ currentUser }) => {
  const [filteredCurrencies, setFilteredCurrencies] = useState<
    {
      name: string;
      value: string;
      unit: string;
      type: string;
    }[]
  >([]);
  const creditCard: Card = currentUser?.cards?.find((card) => {
    return card.type == 'CREDIT';
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/exchange_rates'
        );
        const data = await response.json();
        console.log(data);

        const filteredData = Object.values(data.rates)
          .filter((currency: any) =>
            [
              'Euro',
              'US Dollar',
              'Bitcoin',
              'Ether',
              'Gold - Troy Ounce',
              'Silver - Troy Ounce',
            ].includes(currency.name)
          )
          .map((currency: any) => {
            const valueInTL = (data.rates.try.value / currency.value).toFixed(
              2
            );
            return {
              name: currency.name,
              value: valueInTL,
              unit: currency.unit,
              type: currency.type,
            };
          });

        setFilteredCurrencies(filteredData);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  const campaigns = [
    {
      id: 1,
      title: 'Spotify',
      description:
        'Bizi kullanarak yaptığınız bütün spotify alışverişlerinde %50 iade',
      image: '/svg/spotify.png',
    },
    {
      id: 2,
      title: 'Apple',
      description: 'Apple ürünlerinde fırsatlar',
      image: '/svg/apple.png',
    },
    {
      id: 3,
      title: 'YemekSepeti',
      description: 'İndirimli iştah kabartan lezzetler',
      image: '/svg/yemeksepeti.png',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center"></div>
      <div className="h-4 w-auto"></div>
      <div className="p-[24px 24px 0px] shadow-elevation-100 rounded-[12px]  dark:border-[#2d2d32]">
        <div className=" bg-neutral-100 dark:bg-[#1d1d21] flex flex-col backdrop-filter shadow-inner backdrop-blur-md h-[200px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid  dark:border-[#2d2d32] w-full mb-4">
          <CampaignSlider campaigns={campaigns} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[30px]">
          <div className=" bg-neutral-100 dark:bg-[#1d1d21] flex  items-center  backdrop-filter shadow-inner  backdrop-blur-md h-[340px]  p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid  dark:border-[#2d2d32] w-[465px] ">
            <CreditCard creditCard={creditCard}/>
          </div>
          <div className=" bg-neutral-100 dark:bg-[#1d1d21] flex flex-col backdrop-filter shadow-inner  backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid  dark:border-[#2d2d32] w-[465px] mb-4">
            <CurrencyTable currencies={filteredCurrencies} />
          </div>
        </div>
        <div className="h-4 w-auto"></div>
        <div className="asset"></div>
      </div>
    </div>
  );
};

export default InfoBox;
