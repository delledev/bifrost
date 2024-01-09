import { useTranslation } from 'react-i18next';
import FormatCurrency, {
  GetFormatter,
} from 'utils/formatters/currencyFormatters';
import { Snapshot } from 'libs/types/snapshot';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  Text,
  ComposedChart,
  Label,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';
import getSnapshots from 'utils/apimiddleware/getSnapshots';
import { Transaction } from 'libs/types/user';
import getAllTransactions from 'utils/apimiddleware/getAllTransactions';
import Typography from 'components/UI/Typography';
import moment from 'moment';

const valueFormatter = (number: number) =>
  `${GetFormatter('TRY').format(number).toString()}`;

export default function Chart() {
  const { t } = useTranslation('dashboard');
  const [_24HourChange, set24HourChange] = useState<number>(0);
  const [_24HourChangeRatio, set_24HourChangeRatio] = useState<number>(0);
  const [_24HourFirstValue, set_24HourFirstValue] = useState<number>(0);
  const [_24HourLastValue, set_24HourLastValue] = useState<number>(0);
  const [_24HourChartColor, set_24HourChartColor] = useState('#00c087');

  const [transactions, settransactions] = useState<Transaction[]>();
  const getTransactionsAsync = () => {
    return getAllTransactions(localStorage.getItem('token'))
      .then()
      .then((res) => {
        if (res?.transactions.length == 1) {
          res.transactions.push(res.transactions[0]);
        }
        settransactions(res?.transactions);
        Set24HourValues();
      });
  };

  const Set24HourValues = () => {
    if(!transactions){
      return
    }

    let firstValue = transactions[0].balanceAfterTransaction 

    set_24HourFirstValue(firstValue);

    let lastValue = transactions[transactions.length - 1].balanceAfterTransaction

    console.log(firstValue)
    console.log(lastValue)
    console.log(transactions)
    set_24HourLastValue(lastValue);
    set_24HourChangeRatio((Number(lastValue) / Number(firstValue) - 1) * 100);
    set24HourChange(Number(lastValue) - Number(firstValue));
  };

  useEffect(() => {
    if (_24HourChange >= 0) {
      set_24HourChartColor('#00c087');
    } else {
      set_24HourChartColor('#A21105');
    }
  }, [_24HourChange]);

  useEffect(() => {
    Set24HourValues();
    console.log(transactions);
  }, [transactions]);

  useEffect(() => {
    getTransactionsAsync();
    console.log(
      `${_24HourChange}  ${_24HourChangeRatio} ${_24HourFirstValue}  ${_24HourLastValue}`
    );
  }, []);
  const dateFormatter = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return formattedDate;
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Typography variant="h4">{`${dateFormatter(
          payload[0]?.payload.date
        )} : ${FormatCurrency(payload[0].value, 'TRY')}`}</Typography>
      );
    }

    return null;
  };

  return (
    <div className="relative">
      {_24HourChange >= 0 ? (
        <>
          <div className="b-[4px] text-2xl text-[#4fbf67]  font-medium leading-normal ">
            {t('24HourDifference')}
          </div>
          <div className="mb-[4px] text-xl text-[#4fbf67]  leading-normal">
            {FormatCurrency(String(_24HourChange), 'TRY')} +
          </div>
          <div className="mb-[4px] text-xl text-[#4fbf67] leading-normal">
            %{String(_24HourChangeRatio.toFixed(2))}+
          </div>
        </>
      ) : (
        <>
          <div className="b-[4px] text-2xl text-[#e85555] font-medium leading-normal ">
            {t('24HourDifference')}
          </div>
          <div className="mb-[4px] text-xl text-[#e85555] leading-normal">
            {FormatCurrency(String(_24HourChange), 'TRY').replace('-', '')}-
          </div>
          <div className="mb-[4px] text-xl text-[#e85555] leading-normal">
            %{String(_24HourChangeRatio.toFixed(2))}-
          </div>
        </>
      )}

      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={transactions}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={_24HourChartColor}
                stopOpacity={0.8}
              />
              <stop
                offset="90%"
                stopColor={_24HourChartColor}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip content={CustomTooltip} />
          <Line
            isAnimationActive={false}
            strokeLinejoin="round"
            dataKey="balanceAfterTransaction"
            stroke={_24HourChartColor}
            strokeWidth={1}
            dot={false}
          />
          <Area
            dataKey="balanceAfterTransaction"
            type="linear"
            strokeLinejoin="round"
            strokeWidth={0}
            fill="url(#gradient)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
