import { PropsWithChildren, useEffect, useState } from 'react';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type ProfileContainerProps = {
  isLoading: boolean;
};

function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
  return <span style={{ marginRight: '0.5rem' }}>{children}</span>;
}

const ProfileContainerSkeleton: React.FC<ProfileContainerProps> = (
  isLoading
) => {
  const [theme, setTheme] = useState();

  return (
    <>
      <SkeletonTheme baseColor={theme} highlightColor={theme}>
        <div className="relative  pl-[16.25rem] w-full pb-[5px] flex flex-col">
          <div className="w-full max-w-[960px] shadow-lg dark:bg-[#1d1d21] rounded-[12px] mx-auto px-3.5  box-border block mt-4">
            <div className="h-6 w-auto"></div>
            <div className="flex gap-4 items-start">
              <div className="rounded-2xl w-[104px] h-[104px]">
                <Skeleton
                  circle={false}
                  height="100%"
                  containerClassName="avatar-skeleton"
                />
              </div>
              <div className="flex flex-col mt-2">
                <Skeleton
                  count={1}
                  wrapper={InlineWrapperWithMargin}
                  inline
                  width={120}
                />
                <Skeleton
                  count={1}
                  wrapper={InlineWrapperWithMargin}
                  inline
                  width={40}
                />
                <Skeleton
                  count={1}
                  wrapper={InlineWrapperWithMargin}
                  inline
                  width={70}
                />
              </div>
            </div>
            <div className="h-6 w-auto"></div>
          </div>

          <div className="mx-auto mt-6 px-[15p] w-full max-w-[960px] flex-grow">
            <Skeleton
              count={2}
              wrapper={InlineWrapperWithMargin}
              inline
              width={90}
            />
            <div className=" border-b border-gray-200 dark:text-gray-400 dark:border-gray-700  xl:mb-0 top-0 "></div>

            <div className="flex mx-auto justify-between mt-2">
              <div className="flex flex-col">
                <Skeleton count={1} inline width={100} />
                <Skeleton
                  circle={false}
                  height="340px"
                  width="600px"
                  containerClassName="chart-skeleton"
                />
              </div>

              <div className="flex flex-col">
                <Skeleton count={1} inline width={100} />
                <Skeleton
                  circle={false}
                  height="340px"
                  width="350px"
                  containerClassName="chart-skeleton"
                />
              </div>
            </div>

            <div className="mt-2">
              <Skeleton
                circle={false}
                height="170px"
                width="960px"
                containerClassName="campaign-skeleton"
              />
            </div>

            <div className="flex justify-between">
              <Skeleton
                className="mt-4"
                circle={false}
                height="250px"
                width="465px"
                containerClassName="credit-skeleton"
              />

              <Skeleton
                className="mt-4"
                circle={false}
                height="250px"
                width="465px"
                containerClassName="credit-skeleton"
              />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </>
  );
};

export default ProfileContainerSkeleton;
