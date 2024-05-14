import React, { useState, useEffect } from "react";

const ListingConditions = () => {
  //const { currentListing, userInfo } = userAppStore();
  return (
    <div className="flex flex-col gap-2 w-full p-4 border border-[#d1d5db] rounded-xl shadow-lg">
      <span className="font-extrabold text-lg md:text-xl pb-3 border-b border-[#dbeafe]">
        Régles du salle
      </span>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2 w-full">
          <span className="font-bold text-base md:text-lg mb-3">
            Conditions d'annulation
          </span>
          <p className="font-medium text-sm md:text-base text-[#6e7582]">
            Remboursez 50 % de la valeur de la réservation lorsque les clients
            annulent la chambre dans les 48 heures suivant la réservation
            réussie et 14 jours avant l'heure d'enregistrement. Ensuite, annulez
            la chambre 14 jours avant l'heure d'arrivée et obtenez un
            remboursement de 50 % du montant total payé (moins les frais de
            service).
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="font-bold text-base md:text-lg mb-3">
            Check-in time
          </span>

          <div className="flex text-[#6e7582] font-medium">
            <div className="flex flex-col gap-2 w-[30%]">
              <span>Check-in</span>
              <span>Check-out</span>
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <span>08:00 am - 12:00 am</span>
              <span>02:00 pm - 04:00 pm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingConditions;
