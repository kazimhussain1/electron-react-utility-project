import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import ProgressbarContext from './providers/ProgressbarContext';

function FullPageProgressBar() {
  const { isProgressbarVisible } = useContext(ProgressbarContext);
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 5 }}
      open={isProgressbarVisible}
    >
      <CircularProgress />
    </Backdrop>
  );
}

export default FullPageProgressBar;
