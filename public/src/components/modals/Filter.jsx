"use client";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";

import { getFiltredListing } from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { RiSeparator } from "react-icons/ri";

import { useTranslation } from 'react-i18next';

const Filter = ({ showFilter, setShowFilter }) => {
  const { t } = useTranslation();
  const {
    listings,
    setListings,
    userInfo,
    min,
    max,
    filter,
    setMin,
    setMax,
    setFilter,
    setDiscardSearch,
    maxValueRange,
    minValueRange,
    setMaxValueRange,
    setMinValueRange,
  } = userAppStore();
  const [rangeValue, setRangeValue] = useState([]);

  useEffect(() => {
    setRangeValue([
      filter?.price ? min : minValueRange,
      filter?.price ? max : maxValueRange,
    ]);
  }, []);

  const changeRangeValue = (value) => {
    setRangeValue(value);
    !filter.price && setFilter({ ...filter, price: true });
    setMin(value[0]);
    setMax(value[1]);
  };

  const handleDiscard = () => {
    (filter.price ||
      filter.switch ||
      filter.coffe ||
      filter.lunch ||
      filter.dinner) &&
      setDiscardSearch();
    setFilter({
      ...filter,
      price: false,
      switch: false,
      coffe: false,
      lunch: false,
      dinner: false,
    });
    setShowFilter(false);
  };

  const handleSave = async () => {
    const max_ = filter.price && max;
    const min_ = filter.price && min;
    const tax_ = filter.switch && "0";

    const filteredListings = await getFiltredListing(
      userInfo.typeUser,
      max_,
      min_,
      tax_,
      filter?.coffe,
      filter?.lunch,
      filter?.dinner
    );

    if (filteredListings) {
      setListings(filteredListings);
    }

    setShowFilter(false);
  };

  return (
    <Transition appear show={showFilter} as={Fragment}>
      <Dialog as="div" open={showFilter} onClose={() => setShowFilter(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>
        <div
          id="fadein_left_modal"
          className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-2xl my-8 text-black animate__animated animate__fadeIn">
              <div className="flex bg-[#fbfbfb] items-center justify-between px-5 py-3 border-b border-gray-300">
                <h5 className="font-bold text-lg">Filter</h5>
                <button
                  onClick={() => setShowFilter(false)}
                  type="button"
                  className="text-white-dark hover:text-dark"
                >
                  X
                </button>
              </div>
              <div className="p-4">
                <div className="flex flex-col gap-8 w-full">
                  {/* Start Price Range */}
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{t('filter.price_range')}</span>
                    <span className="text-sm">
                    {t('filter.price_range_subtitle')}
                    </span>
                  </div>
                  <RangeSlider
                    min={minValueRange}
                    max={maxValueRange}
                    step={10}
                    value={rangeValue}
                    onInput={(value) => changeRangeValue(value)}
                  />
                  <div className="flex gap-2 justify-between items-center">
                    <div className="flex flex-col w-full border border-gray-500 rounded-lg">
                      <label
                        htmlFor="minField"
                        className="block text-gray-400 text-xs font-semibold m-1"
                      >
                        Minimum
                      </label>
                      <input
                        id="minField"
                        name="minValue"
                        value={rangeValue[0]}
                        type="text"
                        onChange={(e) =>
                          changeRangeValue([e.target.value, rangeValue[1]])
                        }
                        className="shadow appearance-none rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <RiSeparator size={35} color="#6b7280" />
                    <div className="flex flex-col w-full border border-gray-500 rounded-lg">
                      <label
                        htmlFor="maxField"
                        className="block text-gray-400 text-xs font-semibold m-1"
                      >
                        Maximum
                      </label>
                      <input
                        id="maxField"
                        name="maxValue"
                        value={rangeValue[1]}
                        type="text"
                        onChange={(e) =>
                          changeRangeValue([rangeValue[0], e.target.value])
                        }
                        className="shadow appearance-none rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                  {/* End Price Range */}

                  {/* Start Hors Tax */}
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">
                    {t('filter.tax')}
                    </span>
                    <span className="text-sm">
                    {t('filter.tax_subtitle')}
                    </span>
                  </div>
                  <Switch
                    checked={filter.switch}
                    onChange={() =>
                      setFilter({ ...filter, switch: !filter.switch })
                    }
                    className={`${filter.switch ? "bg-blue-700" : "bg-gray-500"}
          relative inline-flex h-[25px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        filter.switch ? "translate-x-7" : "translate-x-0"
                      }
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  {/* End Hors Tax */}

                  {/* Start Prestation */}
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{t('filter.eating')}</span>
                    <span className="text-sm mb-3">
                      {t('filter.eating_subtitle')}
                    </span>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-1 rounded-full cursor-pointer"
                        htmlFor="cafe"
                        data-ripple-dark="true"
                      >
                        <input
                          id="cafe"
                          type="checkbox"
                          onChange={(e) =>
                            setFilter({ ...filter, coffe: e.target.checked })
                          }
                          checked={filter.coffe}
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-950 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        />
                        <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </label>
                      <label
                        className="mt-px text-gray-950 font-medium cursor-pointer select-none"
                        htmlFor="cafe"
                      >
                        {t('filter.coffee')}
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-1 rounded-full cursor-pointer"
                        htmlFor="lunch"
                        data-ripple-dark="true"
                      >
                        <input
                          id="lunch"
                          type="checkbox"
                          onChange={(e) =>
                            setFilter({ ...filter, lunch: e.target.checked })
                          }
                          checked={filter.lunch}
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-950 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        />
                        <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </label>
                      <label
                        className="mt-px text-gray-950 font-medium cursor-pointer select-none"
                        htmlFor="lunch"
                      >
                        {t('filter.lunch')}
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-1 rounded-full cursor-pointer"
                        htmlFor="dinner"
                        data-ripple-dark="true"
                      >
                        <input
                          id="dinner"
                          type="checkbox"
                          onChange={(e) =>
                            setFilter({ ...filter, dinner: e.target.checked })
                          }
                          checked={filter.dinner}
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-950 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        />
                        <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </label>
                      <label
                        className="mt-px text-gray-950 font-medium cursor-pointer select-none"
                        htmlFor="dinner"
                      >
                        {t('filter.dinner')}
                      </label>
                    </div>
                  </div>
                  {/* End Prestation */}
                </div>
                <div className="flex justify-end items-center mt-8 pt-2 border-t border-gray-300">
                  <button
                    onClick={() => handleDiscard()}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    {t('button.reset')}
                  </button>
                  <button
                    onClick={() => handleSave()}
                    type="button"
                    className="btn btn-primary ml-4"
                  >
                    {t('button.show')}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Filter;
