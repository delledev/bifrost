import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/router';
import 'dayjs/locale/en';

export default function UniversalDatePicker(props) {
  const router = useRouter();
  return (
    <div className="w-full mt-4">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <DatePicker
          label={props.label}
          className="w-full bg-white"
          onChange={props.onChange}
          format={props.format}
        />
      </LocalizationProvider>
    </div>
  );
}
