import { useEffect, useState } from 'react';
import getAllApplicationsToObject from 'utils/apimiddlewareAdmin/getAllApplicationsToObject';
import { useTranslation } from 'next-i18next';
import approveCreditCardApplication from 'utils/apimiddlewareAdmin/approveCreditCardApplication';
import rejectCreditCardApplication from 'utils/apimiddlewareAdmin/rejectCreditCardApplication';
import { AdminApplication } from 'libs/types/adminApplication';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { CreditCard } from 'react-feather';
import Typography from 'components/UI/Typography';
import Box from '@material-ui/core/Box';
import FormatCurrency from 'utils/formatters/currencyFormatters';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ApplicationsList(props) {
  const { t } = useTranslation('admin');
  const [searchApplication, setSearchApplication] = useState('');
  const [cardLimit, setCardLimit] = useState('');
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const ProcessedApplicationsId = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllApplicationsToObject(
          localStorage.getItem('token')
        );
        if (res?.allApplications && res.allApplications.length > 0) {
          setApplications(res.allApplications);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApplicationSearch = (e) => {
    setSearchApplication(e.target.value);
  };

  const applicationFilteredList = applications?.filter(
    (application) =>
      !ProcessedApplicationsId.includes(application?.id) &&
      application?.firstName
        .toLowerCase()
        .includes(searchApplication.toLowerCase())
  );

  const handleLimitChange = (e) => {
    setCardLimit(e.target.value);
  };

  const handleApproveButtonClick = async (id) => {
    const resp = await approveCreditCardApplication(
      localStorage.getItem('token'),
      id,
      parseInt(cardLimit)
    );
    if (resp.success) {
      // After approving the application, update the table
      const res = await getAllApplicationsToObject(
        localStorage.getItem('token')
      );
      setApplications(res?.allApplications);
      ProcessedApplicationsId.push(id);
    }
  };

  const handleRejectButtonClick = async (id) => {
    const resp = await rejectCreditCardApplication(
      localStorage.getItem('token'),
      id
    );
    if (resp.success) {
      // After rejecting the application, update the table
      const res = await getAllApplicationsToObject(
        localStorage.getItem('token')
      );
      setApplications(res?.allApplications);
      ProcessedApplicationsId.push(id);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div key="applications" className="relative h-full w-full">
      <Box className="m-6">
        <Typography variant="h3">{t('SearchApplications')}</Typography>
      </Box>
      <div className="flex justify-end items-center mb-8 ">
        <input
          type="text"
          placeholder={t('SearchApplicationsPlaceHolder')}
          value={searchApplication}
          onChange={handleApplicationSearch}
          className="px-4 py-2 border justify-end w-full rounded-[12px] bg-white-dark dark:bg-black text-black dark:text-white"
        />
      </div>
      {applications.length > 0 ? (
        <TableContainer className="shadow-3xl" component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Typography variant="h4">{t('ApplicationId')}</Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="h4">
                    {t('ApplicationFirstName')}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="h4">
                    {t('ApplicationLastName')}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="h4">{t('ApplicationEmail')}</Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="h4">
                    {t('ApplicationUserSince')}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="h4">
                    {t('ApplicationTotalAssetValue')}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="h4">
                    {t('ApplicationApprove')}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="h4">{t('ApplicationReject')}</Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="h4">
                    {t('ApplicationCardLimit')}
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationFilteredList?.map((application) => (
                <StyledTableRow key={application.id}>
                  <StyledTableCell component="th" scope="row">
                    <Typography variant="p">{application?.id}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography variant="p">
                      {application?.firstName}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography variant="p">{application?.lastName}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography variant="p">{application?.email}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography variant="p">
                      {String(application.userSince).split('T')[0]}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography variant="p">
                      {FormatCurrency(application?.totalAssetValueInTRY, 'TRY')}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <button
                      className="px-4 py-2 mr-2 text-sm font-medium text-white bg-green rounded-md hover:bg-green-600"
                      onClick={() => handleApproveButtonClick(application?.id)}
                    >
                      {t('Approve')}
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <button
                      className="px-4 py-2 mr-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                      onClick={() => handleRejectButtonClick(application?.id)}
                    >
                      {t('Reject')}
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <input
                      type="text"
                      className="w-20 p-2 border rounded-md"
                      value={cardLimit}
                      onChange={handleLimitChange}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <Typography variant="h4">{t('NoApplicationsFound')}</Typography>
        </div>
      )}
    </div>
  );
}
