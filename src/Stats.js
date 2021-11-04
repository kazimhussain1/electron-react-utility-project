import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TableHead,
  Typography
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import DataContext from './providers/DataProvider';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18
  }
}));

function ElevatedPaper(props) {
  return <Paper elevation={3} {...props} />;
}

function Stats() {
  const { mean, median, mode, sd } = useContext(DataContext).data || {};

  return mean ? (
    <TableContainer component={ElevatedPaper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow key="mean" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <StyledTableCell align="center" component="th" scope="row">
              <Typography variant="h6">Mean</Typography>
            </StyledTableCell>
            <StyledTableCell align="center" component="th" scope="row">
              <Typography variant="h6">Median</Typography>
            </StyledTableCell>
            <StyledTableCell align="center" component="th" scope="row">
              <Typography variant="h6">Mode</Typography>
            </StyledTableCell>
            <StyledTableCell align="center" component="th" scope="row">
              <Typography variant="h6">Standard Deviation</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key="mean" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <StyledTableCell align="center">{mean.toFixed(3)}</StyledTableCell>
            <StyledTableCell align="center">{median.toFixed(3)}</StyledTableCell>
            <StyledTableCell align="center">{mode.toFixed(3)}</StyledTableCell>
            <StyledTableCell align="center">{sd.toFixed(3)}</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box />
  );
}

export default Stats;
