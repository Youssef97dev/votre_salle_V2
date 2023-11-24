import { Dialog, Transition, Switch } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";

import { userAppStore } from "airbnb/store/store";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { RiSeparator } from "react-icons/ri";

const Filter = ({ showFilter, setShowFilter }) => {
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
    (filter.price || filter.switch) && setDiscardSearch();
    setFilter({ ...filter, price: false, switch: false });
    setShowFilter(false);
  };

  const handleSave = () => {
    if (filter.price) {
      if (userInfo.typeUser === "B2C") {
        setListings(
          listings.filter(
            (listing) => listing.price >= min && listing.price <= max
          )
        );
      } else {
        setListings(
          listings.filter(
            (listing) => listing.priceB2b >= min && listing.priceB2b <= max
          )
        );
      }
    }

    if (filter.switch) {
      setListings(listings.filter((listing) => listing.tax === "0"));
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
            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black animate__animated animate__fadeInUp">
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
                    <span className="font-semibold text-lg">Price range</span>
                    <span className="text-sm">
                      Price per day, taxes included
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
                      Excluding taxes
                    </span>
                    <span className="text-sm">
                      {"Show total (excluding taxes)"}
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
                    <span className="font-semibold text-lg">Eating Breaks</span>
                    <span className="text-sm">
                      coffee break / lunch break / dinner break
                    </span>
                  </div>
                  {/* End Prestation */}
                </div>
                <div className="flex justify-end items-center mt-8 pt-2 border-t border-gray-300">
                  <button
                    onClick={() => handleDiscard()}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => handleSave()}
                    type="button"
                    className="btn btn-primary ml-4"
                  >
                    Show
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
