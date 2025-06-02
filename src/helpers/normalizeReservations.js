// Purpose: Resets certain fields like postCodeDetails.id and waitingPickupTime
// to prevent broken state when users navigate back & forth between pages

//when select point on postcode we sassing id empty string to be isible -select option 
//so when we get back to refresh quotation we need to assumed that id is 0 <THIS is not reflecting what he select on trasnfer details page>
//when we add postcode point we set id :" "  if smone come back to home page change datetime we need to set id:0
//when we add postcode point we set id :" "  if smone come back to home page change datetime we need to set id:0
export const normalizeReservations = (reservations) => {
    return reservations.map((obj) => {
        const selectedPickupPoints = obj.selectedPickupPoints.map((point) => {
            if (point.pcatId === 5) {
                return {
                    ...point,
                    postCodeDetails: { ...point.postCodeDetails, id: 0 },
                };
            }

            if (point.pcatId === 1) {
                return {
                    ...point,
                    flightDetails: {
                        ...point.flightDetails,
                        waitingPickupTime: 0,
                    },
                };
            }

            return point;
        });

        const selectedDropoffPoints = obj.selectedDropoffPoints.map((point) => {
            if (point.pcatId === 5) {
                return {
                    ...point,
                    postCodeDetails: { ...point.postCodeDetails, id: 0 },
                };
            }

            if (point.pcatId === 1) {
                return {
                    ...point,
                    flightDetails: {
                        ...point.flightDetails,
                        waitingPickupTime: 0,
                    },
                };
            }

            return point;
        });

        return {
            ...obj,
            selectedPickupPoints,
            selectedDropoffPoints,
        };
    });
};
