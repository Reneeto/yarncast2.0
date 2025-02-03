import React from "react";
import { useState } from "react";

export default function Filters({location, setLocation, searchLocation}) {

  return (
    <div id="filters">
      <p>Choose your temperature blanket location and date range.</p>
      <label>Search by city or ZIP code</label>
      <input
        type="text"
        value={location.location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Select Location"
        onFocus={(event) => (event.target.placeholder = "")} //removes "Select Location" and replacing with empty string
        onBlur={searchLocation}
        className="inputs"
      />
      {/* <label>Enter Start Date</label>
      <DatePicker
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        // onChange={(date: Date) => setStartDate(date)}
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
        // onChange={(date: Date) => setEndDate(date)}
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
      </div> */}
    </div>
  );
}
