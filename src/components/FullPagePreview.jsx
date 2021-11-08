import { useContext } from 'react';
import { Backdrop, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PreviewContext from '../providers/PreviewProvider';

function FullPagePreview() {
  const { imgUrl, hidePreview } = useContext(PreviewContext);

  const handleClose = () => {
    hidePreview();
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}
      open={imgUrl !== null}
      onClick={handleClose}
    >
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <IconButton>
          <CloseIcon sx={{ color: (theme) => theme.palette.common.white }} />
        </IconButton>
      </Box>
      <img width="80%" src={imgUrl} alt="" />
    </Backdrop>
  );
}

export default FullPagePreview;
