import { FC } from 'react';
import cx from 'classnames';
import Box, { BoxProps } from '@material-ui/core/Box';

interface TypographyProps extends BoxProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
}

const CLASSES = {
  h1: `font-mono font-extrabold text-black dark:text-white sm:text-5xl text-4xl`,
  h2: 'font-bold text-black dark:text-white sm:text-4xl text-3xl',
  h3: 'font-bold text-black dark:text-white text-2xl',
  h4: 'font-medium text-gray dark:text-white text-lg',
  h5: `font-mono text-lg`,
  p: 'font-medium text-lg text-stieglitz dark:text-wave-blue',
};

const Typography: FC<TypographyProps> = (props) => {
  const { children, variant, component, className, ...otherProps } = props;

  return (
    <Box
      component={component || variant}
      className={cx(CLASSES[variant], className)}
      {...otherProps}
    >
      {children}
    </Box>
  );
};

export default Typography;
