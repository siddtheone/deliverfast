import {
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import AppContainer from "components/app-container";
import { useReadUser } from "hooks";
import { useCreateParcel, useGetParcels } from "hooks/api";
import { User } from "types";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  pickup: HTMLInputElement;
  dropoff: HTMLInputElement;
}
interface CreateFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export function Sender() {
  const { mutate: createParcel } = useCreateParcel();
  const { id } = useReadUser() as User["user"];
  const { data = [], isLoading } = useGetParcels(id);
  const handleSubmit = (e: React.FormEvent<CreateFormElements>) => {
    e.preventDefault();
    const { name, pickup, dropoff } = e.currentTarget.elements;
    const nameValue = name.value.trim();
    const pickupValue = pickup.value.trim();
    const dropoffValue = dropoff.value.trim();
    if (nameValue === "" || pickupValue === "" || dropoffValue === "") {
      return;
    }

    createParcel({
      name: nameValue,
      pickup: pickupValue,
      dropoff: dropoffValue,
      createdTime: new Date(),
    });
  };
  return (
    <AppContainer>
      <Box
        sx={{
          my: 2,
          alignItems: "stretch",
          display: "flex",
          justifyContent: "space-between",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField name="name" label="Name" />
        <TextField name="pickup" label="Pick up" />
        <TextField name="dropoff" label="Drop off" />
        <Button type="submit" variant="outlined">
          Submit
        </Button>
        <Button type="reset" variant="contained">
          Reset
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="Parcels table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Pickup</TableCell>
              <TableCell align="right">Dropoff</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading &&
              [1].map((row) => (
                <TableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.pickup}</TableCell>
                  <TableCell align="right">{row.dropoff}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AppContainer>
  );
}

export default Sender;
