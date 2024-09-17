import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";


export default function MainComponent() {
  const [Timings, setTimings] = useState({
    Fajr: "04:22",
    Dhuhr: "11:58",
    Asr: "15:30",
    Maghrib: "18:10",
    Isha: "19:31",
  });
  const [selectedCity, setSelectedCity] = useState({
     displayName: "بغداد", 
     apiName: "baghdad",
  });

  const avaliableCities = [
    { displayName: "بغداد", apiName: "baghdad" },
    { displayName: "موصل", apiName: "mosul" },
    { displayName: "بصرة", apiName: "basra" },
  ];
  const [today,setToday] = useState("");
 

  const handleCityChange = (event) => {
    const cityObject = avaliableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    console.log("the city is", event.target.value);
    setSelectedCity(cityObject);
  };

  const getTimings = async () => {
    const respose = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=IQ&city=${selectedCity.apiName}`
    );
    console.log("caliing the api request");
    setTimings(respose.data.data.timings);
  };

  useEffect(() => {
    getTimings();
    const t= moment();
    setToday(t.format ("M D Y |h:mm"))

  }, [selectedCity]);

  return (
    <>
      {/* TOP ROW */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>
       
      </Grid>
      {/*== TOP ROW ==*/}
      <Divider style={{ borderColor: "white", opacity: "0.1" }} />
      {/* PRAYERS CARDS  */}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "50PX" }}
      >
        <Prayer
          name="الفجر"
          time={Timings.Fajr}
          image="https://img.freepik.com/premium-photo/mosque-with-lanterns-islamic-lanterns-mosque-lighting-beautiful-mosque-mosque-decor-mosque-arch_861161-34244.jpg?w=1480"
        />
        <Prayer
          name="الظهر"
          time={Timings.Dhuhr}
          image="https://th.bing.com/th/id/OIP.0SXoxj_AbBVWviMy3udCowHaHa?pid=ImgDet&w=191&h=191&c=7"
        />
        <Prayer
          name="العصر"
          time={Timings.Asr}
          image="https://th.bing.com/th/id/OIP.wEa1AxpqY47rwmUezyXJZwHaHa?pid=ImgDet&w=191&h=191&c=7"
        />
        <Prayer
          name="المغرب"
          time={Timings.Maghrib}
          image="https://th.bing.com/th/id/OIP.F_0SGHVuYOxarDFQY1Z0VAAAAA?pid=ImgDet&w=191&h=286&c=7"
        />
        <Prayer
          name="العشاء"
          time={Timings.Isha}
          image="https://img.freepik.com/premium-photo/mosque-background_861161-5324.jpg"
        />
      </Stack>
      {/*== PRAYERS CARDS  ==*/}
      <Stack
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
            المدينة
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={handleCityChange}
          >
            {avaliableCities.map((city) =>{
              return (      
              <MenuItem value={city.apiName} key={"بغداد"}>{city.displayName}</MenuItem>
              );
            })}
     
           
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
