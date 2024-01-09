import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageIcon from '@material-ui/icons/Language';
import Typography from 'components/UI/Typography';

export const LANGUAGE_CODES = {
  en: 'EN',
  tr: 'TR',
};
const LangMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleClick = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );

  const handleClose = useCallback(() => setAnchorEl(null), []);

  return (
    <>
      <Button
        aria-controls="lang-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <LanguageIcon className="mr-2 dark:text-wave-blue" />
        <Typography variant="p" component="span" className="mb-1">
          {LANGUAGE_CODES[router.locale]}
        </Typography>
      </Button>
      <Menu
        id="lang-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: 'dark:bg-cod-gray' }}
      >
        {Object.keys(LANGUAGE_CODES).map((lang) => {
          const handleClick = () => {
            router.push(router.pathname, router.pathname, { locale: lang });
          };
          return (
            <MenuItem onClick={handleClick} key={lang}>
              <Typography variant="p" component="span">
                {LANGUAGE_CODES[lang]}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default LangMenu;
