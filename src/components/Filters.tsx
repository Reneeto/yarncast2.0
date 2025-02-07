import React from "react";
import DatePicker from "react-datepicker";
import { useRef } from "react";

interface Props {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  searchLocation: () => void;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  handleClick: () => void;
}

export default function Filters({
  location,
  setLocation,
  searchLocation,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleClick,
}: Props) {
  //startRef is a reference to the startDate DatePicker
  const startRef = useRef<DatePicker>(null);

  //allows you to tab from one Datepicker to the next - see what best practices is for tabbing
  const onKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "tab") {
      //current is optional in case the ref is null
      startRef.current?.setOpen(false);
    }
  };

  return (
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
  );
}
