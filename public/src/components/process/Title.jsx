import { userAppStore } from "airbnb/store/store";
import Description from "./Description";
import Price from "./Price";
import React from "react";

export default function Title() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    tax,
    setTax,
    priceB2b,
    setPriceB2b,
    placeSpace,
    setPlaceSpace,
  } = userAppStore();

  const handleChangeGuest = (e) => {
    setPlaceSpace({ ...placeSpace, guests: e.target.value });
  };

  return (
    <>
      {/*<div className="flex flex-col gap-3 items-center justify-center text-airbnb-light-black panel-home w-[95%] lg:w-[38%]">
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <span className="font-medium text-base md:text-xl">Title</span>
            <input
              type="text"
              className="form-input !py-3"
              value={title}
              onChange={(e) => {
                if (e.target.value.length <= 32) {
                  setTitle(e.target.value);
                }
              }}
            />
            <span className="text-xs md:text-base">{title.length}/32</span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="font-medium text-base md:text-xl whitespace-nowrap">
              Guest Number
            </span>
            <input
              type="number"
              className="form-input !py-3"
              min={0}
              onChange={(e) => handleChangeGuest(e)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-1 w-full">
          <div className="flex flex-col gap-2 w-full relative">
            <span className="font-medium text-base md:text-xl">B2C Price</span>
            <span className="border-l font-medium border-gray-500 pl-1 absolute  right-2 top-10 lg:top-[3.7rem] transform -translate-y-1/2 text-lg  lg:text-xl text-neutral-600">
              MAD
            </span>
            <input
              type="text"
              className="form-input !py-3"
              value={price}
              onChange={(e) => {
                if (e.target.value) {
                  setPrice(parseInt(e.target.value));
                } else setPrice(0);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full relative">
            <span className="font-medium text-base md:text-xl">B2B Price</span>
            <span className="border-l font-medium border-gray-500 pl-1 absolute  right-2 top-10 lg:top-[3.7rem] transform -translate-y-1/2 text-lg  lg:text-xl text-neutral-600">
              MAD
            </span>
            <input
              type="text"
              className="form-input !py-3"
              value={priceB2b}
              onChange={(e) => {
                if (e.target.value) {
                  setPriceB2b(parseInt(e.target.value));
                } else setPriceB2b(0);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <span className="font-medium text-base md:text-xl">Description</span>
          <textarea
            className="h-36 w-full rounded-lg form-input no-scrollbar text-lg "
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setDescription(e.target.value);
              }
            }}
          />
          <span className="text-xs md:text-base">{description.length}/500</span>
        </div>

        <div className="flex flex-row gap-3 w-full justify-between font-medium">
          <div
            onClick={() => setTax(10)}
            className={`py-4 rounded border w-full cursor-pointer text-center ${
              tax === 10
                ? "bg-[#1b4db98e] border-[#1b4db98e] text-[#fff]"
                : "border-[#9095a086] hover:bg-[#1b4db98e] hover:border-[#1b4db98e] hover:text-[#fff]"
            }`}
          >
            10%
          </div>
          <div
            onClick={() => setTax(20)}
            className={`py-4 rounded border w-full cursor-pointer text-center ${
              tax === 20
                ? "bg-[#1b4db98e] border-[#1b4db98e] text-[#fff]"
                : "border-[#9095a086] hover:bg-[#1b4db98e] hover:border-[#1b4db98e] hover:text-[#fff]"
            }`}
          >
            20%
          </div>
          <div
            onClick={() => setTax(0)}
            className={`py-4 rounded border w-full cursor-pointer text-center ${
              tax === 0
                ? "bg-[#1b4db98e] border-[#1b4db98e] text-[#fff]"
                : "border-[#9095a086] hover:bg-[#1b4db98e] hover:border-[#1b4db98e] hover:text-[#fff]"
            }`}
          >
            Exonerer
          </div>
        </div>
          </div>*/}

      <div className="space-y-5 panel">
        <h1 className="text-xl md:text-4xl">
          <strong>More informations</strong>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="gridTitle">Title</label>
            <input
              id="gridTitle"
              type="text"
              value={title}
              className="form-input"
              onChange={(e) => {
                if (e.target.value.length <= 32) {
                  setTitle(e.target.value);
                }
              }}
            />
            <span className="text-xs md:text-base">{title.length}/32</span>
          </div>
          <div>
            <label htmlFor="gridGuests">Guests</label>
            <input
              id="gridGuests"
              type="number"
              className="form-input"
              min={0}
              onChange={(e) => handleChangeGuest(e)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="gridB2C">B2C Price</label>
            <div className="flex flex-1">
              <input
                id="gridB2C"
                type="number"
                className="form-input rounded-r-none"
                value={price}
                onChange={(e) => {
                  if (e.target.value) {
                    setPrice(parseInt(e.target.value));
                  } else setPrice(0);
                }}
              />
              <div className="bg-[#eee] flex justify-center items-center  rounded-r-md px-3 font-semibold border border-l-0 border-[#e0e6ed]">
                MAD
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="gridB2B">B2B Price</label>
            <div className="flex flex-1">
              <input
                id="gridB2B"
                type="number"
                className="form-input rounded-r-none"
                value={priceB2b}
                onChange={(e) => {
                  if (e.target.value) {
                    setPriceB2b(parseInt(e.target.value));
                  } else setPriceB2b(0);
                }}
              />
              <div className="bg-[#eee] flex justify-center items-center  rounded-r-md px-3 font-semibold border border-l-0 border-[#e0e6ed]">
                MAD
              </div>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="gridDescription">Description</label>
          <textarea
            id="gridDescription"
            type="text"
            className="form-input h-28 no-scrollbar"
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setDescription(e.target.value);
              }
            }}
          />
          <span className="text-xs md:text-base">{description.length}/500</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="tax"
              onChange={() => setTax(10)}
              className="form-radio peer"
              defaultChecked
            />
            <span className="peer-checked:text-[#4361ee]">10%</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              name="tax"
              onChange={() => setTax(20)}
              className="form-radio text-[#00ab55] peer"
            />
            <span className="peer-checked:text-[#00ab55]">20%</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              name="tax"
              onChange={() => setTax(0)}
              className="form-radio text-[#805dca] peer"
            />
            <span className="peer-checked:text-[#805dca]">Exonerer</span>
          </label>
        </div>
      </div>
    </>
  );
}
