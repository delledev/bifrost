import { FC, ReactNode } from 'react';
import cx from 'classnames';

const Section: FC<{ className?: string; children?: ReactNode }> = ({
  children,
  className,
}) => {
  return (
    <section
      className={cx(
        'xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl max-w-md mx-auto  py-10 sm:py-20 px-5 sm:px-6',
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
