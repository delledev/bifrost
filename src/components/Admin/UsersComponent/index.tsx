import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminShowCardsPopup from 'components/Popups/AdminShowCardsPopup';
import { User } from 'libs/types/user';
import Typography from 'components/UI/Typography';
import Box from '@material-ui/core/Box';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: 'transparent',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function UserList(props) {
  const { t } = useTranslation('admin');
  const [searchUser, setSearchUser] = useState('');
  const [selectedUser, setSelectedUser] = useState<User>();
  const [open, setOpen] = useState(false);
  const users = props?.users;

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleUserSearch = (e) => {
    setSearchUser(e.target.value);
  };
  const userFilteredList = users?.filter((user) =>
    user?.firstName.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div key="users" className="relative h-full w-full">
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AdminShowCardsPopup selectedUser={selectedUser}></AdminShowCardsPopup>
      </Modal>
      <Box className="m-6">
        <Typography variant="h3">{t('SearchUsers')}</Typography>
      </Box>
      <input
        type="text"
        placeholder={t('SearchUsersPlaceHolder')}
        value={searchUser}
        onChange={handleUserSearch}
        className="px-4 py-2 border justify-end w-full rounded-[12px] bg-white-dark dark:bg-black text-black dark:text-white"
      />
      <TableContainer component={Paper} className="mt-5 shadow-3xl">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <Typography variant="h4">{t('Name')}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">{t('LastName')}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">{t('E-Mail')}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">{t('PhoneNumber')}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">{t('Role')}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4">{t('Cards')}</Typography>
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {userFilteredList?.map((user) => (
              <StyledTableRow key={user.identificationString}>
                <StyledTableCell>
                  <Typography variant="p">{user.firstName}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="p">{user.lastName}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="p">{user.email}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="p">{user.phoneNumber}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="p">{user.role}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={() => handleOpen(user)}
                  >
                    {t('ShowCards')}
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
