import * as React from "react";
import {useState, useRef, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../assets/yarncast-logo.png"
import placeholder from "../assets/placeholder-with-text.png";

const App = () => {
  //what does this do?
  let isDisabled: boolean = true;

  //image that is displayed before the blanket is generated. could move this to it's own component that would be replaced by the blanket
  const displayImage = (
    <img src={placeholder} alt="placeholder image" className="image-fade-in" />
  );

  //generates color for each row of the blanket
  const Blanket = () => {
    return (
      <div className="blanket">
        {colors.map((color) => (
          <>
            <div className="row" style={{ backgroundColor: color }}>
              &nbsp;
            </div>
          </>
        ))}
      </div>
    );
  };

  //latitude and longitude of input location - structure reflects how the API returns the data
  const [coordinates, setCoordinates] = useState({
    results: [
      {
        longitude: 0,
        latitude: 0,
      },
    ],
  });
  //where name of location is stored
  const [location, setLocation] = useState<string>("");
  //array of temperatures for each day in the date range
  const [weather, setWeather] = useState<number[]>([]);
  //start and end dates for the date range - could combine this state somehow
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startDateString, setStartDateString] = useState<string>("");
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endDateString, setEndDateString] = useState<string>("");
  //corresponding colors to weather array
  const [colors, setColors] = useState<string[]>([]);
  //how I'm displaying the blanket - starts with placeholder image
  const [displayChildren, setDisplayChildren] = useState<React.JSX.Element[]>([displayImage]);
  const isFirstRender = useRef(true);
  //startRef is a reference to the startDate DatePicker
  const startRef = useRef<DatePicker>(null);
  
  //when startDate and endDate are updated, format them to update startDateString
  useEffect(() => {
    formatDate(startDate);
    formatDate(endDate);
  }, [startDate, endDate]);

  // what does this do?
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    getWeatherData();
    isDisabled = true;
  }, [endDate]);

  //what
  useEffect(() => {
    isDisabled = true;
    return;
  }, [location]);

  //what
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    matchColors(weather);
  }, [weather]);

  //FIRST: get longitude and latitude from geolocation API
  const searchLocation = () => {
    console.log("getting lon and lat");
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setCoordinates(data);
        console.log(coordinates);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //SECOND: format start and end dates for API call
  const formatDate = (date: Date): void => {
    const formattedDate = new Date(date).toISOString().substring(0, 10);
    if (date === startDate) {
      setStartDateString(formattedDate);
    } else {
      setEndDateString(formattedDate);
    }

    return;
  };

  //THIRD: get weather data from coordinates and dates from historical weather API
  const getWeatherData = () => {
    console.log("getting weather data");
    fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${coordinates.results[0].latitude}&longitude=${coordinates.results[0].longitude}&start_date=${startDateString}&end_date=${endDateString}&daily=temperature_2m_max&timezone=GMT&temperature_unit=fahrenheit&min=2023-06-09&max=2023-06-23`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.daily.temperature_2m_max);
        setWeather(data.daily.temperature_2m_max);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //FOURTH: match temps to color formulas
  function matchColors(tempsArr: number[]): void {
    const rangeValues: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const colorsArr: string[] = [];
    tempsArr.forEach((el: number) => {
      if (el < rangeValues[0]) {
        //0-
        colorsArr.push("#62767d");
      } else if (el < rangeValues[1]) {
        //0-9
        colorsArr.push("#84928a");
      } else if (el < rangeValues[2]) {
        //10-19
        colorsArr.push("#858F7E");
      } else if (el < rangeValues[3]) {
        //20-29
        colorsArr.push("#868B72");
      } else if (el < rangeValues[4]) {
        //30-39
        colorsArr.push("#65684d");
      } else if (el < rangeValues[5]) {
        //40-49
        colorsArr.push("#A9A38A");
      } else if (el < rangeValues[6]) {
        //50-59
        colorsArr.push("#ecdec7");
      } else if (el < rangeValues[7]) {
        //60-69
        colorsArr.push("#E2CEBB");
      } else if (el < rangeValues[8]) {
        //70-79
        colorsArr.push("#d8beaf");
      } else if (el < rangeValues[9]) {
        //80-89
        colorsArr.push("#A58A82");
      } else if (el < rangeValues[10]) {
        //90-99
        colorsArr.push("#725654");
      } else {
        //100+
        colorsArr.push("#513438");
      }
    });
    setColors(colorsArr);
  }


  
  //allows you to tab from one Datepicker to the next - see what best practices is for tabbing
  const onKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "tab") {
      //current is optional in case the ref is null  
      startRef.current?.setOpen(false);
    }
  };

  //FIFTH: display the blanket
  const handleClick = (): void => {
    setDisplayChildren([<Blanket key={0} />]);
  };

  {
    return (
      <div className="container">
        <div className="header" id="header">
          <img src={logo} alt="yarncast-logo" className="image-fade-in" />
          <p>
            A website that helps crafters visualize their temperature blanket
            projects
            <br /> and make it easy to get the data they need to get crafting.
          </p>
        </div>
        <div id="filters">
          <p>Choose your temperature blanket location and date range.</p>
          <label>Search by city or ZIP code</label>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Select Location"
            onFocus={(event) => (event.target.placeholder = "")} //removes "Select Location" and replacing with empty string
            onBlur={searchLocation}
            className="inputs"
          />
          <label>Enter Start Date</label>
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={(date: Date) => setStartDate(date)}
            ref={startRef}
            onKeyDown={onKeyDown}
            className="inputs"
          />
          <label>Enter End Date</label>
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            onChange={(date: Date) => setEndDate(date)}
            className="inputs"
          />
          <div className="buttons">
            <button
              disabled={!location}
              onClick={() => handleClick()}
              className="inputs"
            >
              Generate Colors
            </button>
          </div>
        </div>
        <div className="display" id="display">
          {displayChildren}
        </div>
        <div className="footer" id="footer">
          <p>© 2023 yarncast</p>
        </div>
      </div>
    );
  }
};

export default App;
