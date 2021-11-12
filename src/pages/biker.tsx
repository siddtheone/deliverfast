import { DateTimePicker } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import AppContainer from "components/app-container";
import { useReadUser } from "hooks";
import { useGetBikersParcels, useUpdateParcel } from "hooks/api";
import { useEffect, useState } from "react";
import { User } from "types";
import { dateFormat } from "utils/utils";

export function Biker() {
  const { id } = useReadUser() as User["user"];
  const { data = [] } = useGetBikersParcels(id);
  const { mutate } = useUpdateParcel();

  return (
    <AppContainer>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gridGap: 24,
        }}
      >
        {data.map((parcel) => {
          const isPickedUp = parcel.pickUpTime !== null;
          return (
            <Card key={parcel.id}>
              <CardContent>
                <Box sx={{ color: "text.secondary" }}>Name</Box>
                <Box sx={{ color: "text.primary", marginBottom: 2 }}>
                  {parcel.name}
                </Box>
                <Box sx={{ color: "text.secondary" }}>Pickup</Box>
                <Box sx={{ color: "text.primary", marginBottom: 2 }}>
                  {parcel.pickup}
                </Box>
                <Box sx={{ color: "text.secondary" }}>Dropoff</Box>
                <Box sx={{ color: "text.primary", marginBottom: 2 }}>
                  {parcel.dropoff}
                </Box>

                {parcel.pickUpTime && (
                  <>
                    <Box sx={{ color: "text.secondary" }}>Picked up time</Box>
                    <Box sx={{ color: "text.primary", marginBottom: 2 }}>
                      {dateFormat(parcel.pickUpTime)}
                    </Box>
                  </>
                )}

                {parcel.dropOffTime && (
                  <>
                    <Box sx={{ color: "text.secondary" }}>Drop off time</Box>
                    <Box sx={{ color: "text.primary", marginBottom: 2 }}>
                      {dateFormat(parcel.dropOffTime)}
                    </Box>
                  </>
                )}
              </CardContent>
              {(parcel.pickUpTime === null || parcel.dropOffTime === null) && (
                <CardActions>
                  <DatePickerForm
                    onSubmit={(dt: FormBody) =>
                      mutate({ ...dt, id: parcel.id })
                    }
                    label={!isPickedUp ? "Pickup" : "Dropoff"}
                  />
                </CardActions>
              )}
            </Card>
          );
        })}
      </Box>
    </AppContainer>
  );
}

type FormBody =
  | {
      pickup: string;
    }
  | {
      dropoff: string;
    };

interface DatePickerFormProps {
  label: "Pickup" | "Dropoff";
  onSubmit: (form: FormBody) => void;
}

function DatePickerForm({ label, onSubmit }: DatePickerFormProps) {
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => setDate(null), [label]);
  const handleSetClick = () =>
    date !== null &&
    onSubmit(label === "Pickup" ? { pickup: date } : { dropoff: date });
  return (
    <>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={date}
        onChange={setDate}
      />
      <Button
        type="submit"
        disabled={date === null}
        onClick={handleSetClick}
      >{`Set ${label}`}</Button>
    </>
  );
}

export default Biker;
