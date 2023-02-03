/* eslint-disable react/prop-types */
import React from "react";

function SettingsParameters({
  textValue,
  userVal,
  handleInputChange,
  handleOnClickValue,
  text,
}) {
  return (
    <li className=" my-3 md:m-6  border shadow-md rounded-lg bg-main-blue text-mainBlue">
      {" "}
      <div className="w-full flex justify-end items-center relative">
        <label
          htmlFor={`${textValue}`}
          name={`${textValue}`}
          className="px-3  font-semibold w-32 border-r-gray "
        >
          {" "}
          {text}
        </label>
        <input
          name={`${textValue}`}
          value={`${userVal}`}
          placeholder={`${userVal}`}
          className=" border-gray-400 bg-gray-100 p-4 w-full h-10 text-gray-500 shadow-inner"
          onChange={handleInputChange}
          onClick={handleOnClickValue}
          required
          id={`${textValue}`}
        />
      </div>
    </li>
  );
}

export default SettingsParameters;
