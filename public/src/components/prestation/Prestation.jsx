import AnimateHeight from "react-animate-height";
import React, { useEffect, useState } from "react";

import { userAppStore } from "airbnb/store/store";
import { useRouter } from "next/navigation";

import { updateLisitngAPI } from "airbnb/lib/lisitng";

const Prestation = ({ data, setShowPrestation }) => {
  const { relaunchData, setRelaunchData } = userAppStore();

  const router = useRouter();
  const [active, setActive] = useState("1");

  const [poseCafe, setPoseCafe] = useState([]);
  const [poseDejeunner, setPoseDejeunner] = useState([]);
  const [poseDinner, setPoseDinner] = useState([]);
  const [prestation, setPrestation] = useState({
    poseCafe: [],
    poseDejeunner: [],
    poseDinner: [],
  });

  const togglePara = (value) => {
    setActive((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const handleInputChange = (e, index, key, type) => {
    const { value } = e.target;
    if (type === "cafe") {
      setPoseCafe((prevPoseCafe) => {
        const updatedPoseCafe = [...prevPoseCafe];
        if (index >= 0 && index < 5) {
          updatedPoseCafe[index] = {
            ...updatedPoseCafe[index],
            [key]: key === "price" ? parseFloat(value) : value,
          };
        }
        return updatedPoseCafe;
      });
    }
    if (type === "dejeunner") {
      setPoseDejeunner((prevPoseDej) => {
        const updatedPoseDej = [...prevPoseDej];
        if (index >= 0 && index < 5) {
          updatedPoseDej[index] = {
            ...updatedPoseDej[index],
            [key]: key === "price" ? parseFloat(value) : value,
          };
        }
        return updatedPoseDej;
      });
    }
    if (type === "dinner") {
      setPoseDinner((prevPoseDinner) => {
        const updatedPoseDinner = [...prevPoseDinner];
        if (index >= 0 && index < 5) {
          updatedPoseDinner[index] = {
            ...updatedPoseDinner[index],
            [key]: key === "price" ? parseFloat(value) : value,
          };
        }
        return updatedPoseDinner;
      });
    }
  };

  const handleSave = async () => {
    setPrestation({ ...prestation, poseCafe, poseDejeunner, poseDinner });
  };

  useEffect(() => {
    if (
      prestation.poseCafe.length > 0 ||
      prestation.poseDejeunner.length > 0 ||
      prestation.poseDinner.length > 0
    ) {
      try {
        updateLisitngAPI(data?.id, prestation).then((res) => {
          setRelaunchData();
          setShowPrestation(false);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [prestation]);

  useEffect(() => {
    if (data.prestation) {
      setPoseCafe(...poseCafe, data?.prestation?.poseCafe);
      setPoseDejeunner(...poseDejeunner, data?.prestation?.poseDejeunner);
      setPoseDinner(...poseDinner, data?.prestation?.poseDinner);
    }
  }, []);

  return (
    <div className="relative h-[80%] w-[40%] rounded-lg  bg-[#F7F7F7] px-2 pt-5 overflow-hidden">
      <div className="w-full h-full overflow-auto  mt-4 pb-8">
        <div className="mb-5">
          <div className="space-y-4 font-semibold">
            <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
              <button
                type="button"
                className={`p-3 w-full flex items-center ${
                  active === "1" ? "text-slate-600" : "text-[#000]"
                }`}
                onClick={() => {
                  togglePara("1");
                }}
              >
                Café
                <div
                  className={`ml-auto ${active === "1" ? "rotate-180" : ""} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                    <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
                  </svg>
                </div>
              </button>
              <div>
                <AnimateHeight
                  duration={300}
                  height={active === "1" ? "auto" : 0}
                >
                  <div className="p-4 text-white-dark border-t border-[#d3d3d3] gap-2 flex flex-col">
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseCafe[0]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 0, "description", "cafe")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        name="price"
                        defaultValue={poseCafe[0]?.price || ""}
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 0, "price", "cafe")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseCafe[1]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 1, "description", "cafe")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseCafe[1]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 1, "price", "cafe")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        placeholder="Description"
                        defaultValue={poseCafe[2]?.description || ""}
                        onChange={(e) =>
                          handleInputChange(e, 2, "description", "cafe")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        name="price"
                        defaultValue={poseCafe[2]?.price || ""}
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 2, "price", "cafe")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        placeholder="Description"
                        defaultValue={poseCafe[3]?.description || ""}
                        onChange={(e) =>
                          handleInputChange(e, 3, "description", "cafe")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseCafe[3]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 3, "price", "cafe")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        placeholder="Description"
                        defaultValue={poseCafe[4]?.description || ""}
                        onChange={(e) =>
                          handleInputChange(e, 4, "description", "cafe")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseCafe[4]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 4, "price", "cafe")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            </div>
            <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
              <button
                type="button"
                className={`p-3 w-full flex items-center ${
                  active === "2" ? "text-slate-600" : "text-[#000]"
                }`}
                onClick={() => togglePara("2")}
              >
                Déjeuner
                <div
                  className={`ml-auto ${active === "2" ? "rotate-180" : ""} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                    <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
                  </svg>
                </div>
              </button>
              <div>
                <AnimateHeight
                  duration={300}
                  height={active === "2" ? "auto" : 0}
                >
                  <div className="p-4 text-white-dark border-t border-[#d3d3d3] gap-2 flex flex-col">
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDejeunner[0]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 0, "description", "dejeunner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDejeunner[0]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 0, "price", "dejeunner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDejeunner[1]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 1, "description", "dejeunner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDejeunner[1]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 1, "price", "dejeunner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDejeunner[2]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 2, "description", "dejeunner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDejeunner[2]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 2, "price", "dejeunner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDejeunner[3]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 3, "description", "dejeunner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDejeunner[3]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 3, "price", "dejeunner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDejeunner[4]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 4, "description", "dejeunner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDejeunner[4]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 4, "price", "dejeunner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            </div>
            <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
              <button
                type="button"
                className={`p-3 w-full flex items-center ${
                  active === "3" ? "text-slate-600" : "text-[#000]"
                }`}
                onClick={() => {
                  togglePara("3");
                }}
              >
                Dinner
                <div
                  className={`ml-auto ${active === "3" ? "rotate-180" : ""} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                    <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
                  </svg>
                </div>
              </button>
              <div>
                <AnimateHeight
                  duration={300}
                  height={active === "3" ? "auto" : 0}
                >
                  <div className="p-4 text-white-dark border-t border-[#d3d3d3] gap-2 flex flex-col">
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDinner[0]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 0, "description", "dinner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDinner[0]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 0, "price", "dinner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDinner[1]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 1, "description", "dinner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDinner[1]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 1, "price", "dinner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDinner[2]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 2, "description", "dinner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDinner[2]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 2, "price", "dinner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDinner[3]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 3, "description", "dinner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDinner[3]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 3, "price", "dinner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        name="description"
                        defaultValue={poseDinner[4]?.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(e, 4, "description", "dinner")
                        }
                        className="border border-gray-400 h-12 w-[70%] rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        defaultValue={poseDinner[4]?.price || ""}
                        name="price"
                        type="number"
                        onChange={(e) =>
                          handleInputChange(e, 4, "price", "dinner")
                        }
                        className="border border-gray-400 rounded-lg w-[30%]"
                      />
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-row font-medium text-white shadow-2xl px-1 py-2 bg-white gap-2 justify-between bottom-0 left-0 border border-[#d3d3d3] w-full h-16">
        <button
          onClick={() => setShowPrestation(false)}
          className="w-full rounded-xl bg-orange-600"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSave()}
          className="w-full rounded-xl bg-sky-900"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Prestation;
