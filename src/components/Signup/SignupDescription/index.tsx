import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function SignupDescription() {
  const { t } = useTranslation('signup');

  return (
    <div className="h-full bg-[linear-gradient(to_right,#C7D2FE,#6a82fb)] dark:bg-[linear-gradient(to_right,#1E313B,#020617)] relative max-ipad:hidden">
      <div className="m-auto h-1/12 max-w-xl px-8 py-[calc(100vh-70%)] rounded-md text-white top-1/2 bottom-0 left-0 right-0 bg-[rgba(249,249,249,0.24)]">
        <h1 className="text-6xl font-semibold w-[480px]">
          {t('Description')}{' '}
          <span className="text-black">{t('DescriptionPunchline')}</span>
        </h1>
        <p className="text-lg font-medium mt-6">{t('DescriptionSubText')}</p>
        <p className="text-lg font-medium">
          {t('DescriptionSubTextSecondLine')}
        </p>
      </div>
    </div>
  );
}

export default SignupDescription;
