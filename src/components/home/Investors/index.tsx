import cx from 'classnames';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'next-i18next';
import Section from 'components/UI/Section';
import Typography from 'components/UI/Typography';

const INVESTORS_DATA = [
  {
    name: 'AKBNK',
    imgClasses: 'rounded-full h-16 lg:h-24',
  },
  {
    name: 'AKBNK',
    imgClasses: 'rounded-full h-16 lg:h-24',
  },
  {
    name: 'AKBNK',
    imgClasses: 'rounded-full h-16 lg:h-24',
  },
  {
    name: 'AKBNK',
    imgClasses: 'rounded-full h-16 lg:h-24',
  },
  {
    name: 'AKBNK',
    imgClasses: 'rounded-full h-16 lg:h-24',
  },
  {
    name: 'AKBNK',
    imgClasses: 'rounded-full h-16 lg:h-24',
  },
];

interface GridItemProps {
  src?: string;
  alt?: string;
  name?: string;
  imgClasses?: string;
  className?: string;
}

const GridItem = ({ src, alt, name, imgClasses, className }: GridItemProps) => {
  return (
    <Box
      className={cx(
        className,
        'flex flex-row items-center justify-center lg:justify-start w-64 lg:w-80'
      )}
    >
      {src ? (
        <img src={src} alt={alt} className={cx(imgClasses, 'object-contain')} />
      ) : null}
      {name ? (
        <h3 className="ml-8 text-5xl text-black dark:text-white">{name}</h3>
      ) : null}
    </Box>
  );
};

const Investors = () => {
  const { t } = useTranslation('home');

  return (
    <Section>
      <Typography variant="h5" className="text-center">
        {t('investorsAndPartners')}
      </Typography>
      <Box className="mt-24 grid grid-cols-1 md:grid-cols-2 justify-items-center gap-y-20 gap-x-10">
        {INVESTORS_DATA.map((data, index) => {
          return <GridItem key={index} {...data} />;
        })}
      </Box>
    </Section>
  );
};

export default Investors;
