import { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'next-i18next';
import { Router, useRouter } from 'next/router';
import ConstructReference from 'libs/refconstructor';

import Section from 'components/UI/Section';
import Typography from 'components/UI/Typography';

const GradientText = ({ children }: { children: ReactNode }) => {
  return <span className="color-aqua">{children}</span>;
};

const Introduction = () => {
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation('common');
  const router = useRouter();
  return (
    <Section className="mt-32 mb-20 md:mb-0 pt-3 sm:pt-3 md:pt-3 lg:pt-3 xl:pt-3">
      <Box className="flex flex-col items-center pt-5 px-5 md:items-center">
        <Typography variant="h1" className="mb-6 md:m-1 md:text-center">
          BiFrost
        </Typography>
        <Typography variant="p" className="mb-8 md:m-1">
          {t('siteDescription')}
        </Typography>
        <Box className="flex flex-col w-full md:flex-row md:w-max md:mt-4">
          <Button
            className="h-16 mb-4 md:mb-0 md:h-10"
            variant="contained"
            color="primary"
            classes={{ label: 'text-lg md:text-sm' }}
            href={ConstructReference('/dashboard/')}
          >
            {tc('getStarted')}
          </Button>
        </Box>
      </Box>
    </Section>
  );
};

export default Introduction;
