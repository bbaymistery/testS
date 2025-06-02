import { collectQuotationsAsync } from "./getQuotations";


/**
 * Dispatches quotation results and optionally navigates to the quotation results page.
 *
 * @param {Object} params
 * @param {Function} params.dispatch - Redux dispatch function.
 * @param {Object} params.router - Next.js router instance for navigation.
 * @param {Object|Array} params.log - Quotation data (can be a single quotation or an array based on journeyType).
 * @param {number|string} params.journeyType - 0 for one-way, 1 for return journey.
 * @param {boolean} [params.shouldNavigate=true] - Whether to redirect to the results page.
 * @param {string} params.language - Current app language (e.g., "en", "tr", etc.).
 */
const pushToQuotationsResultPage = (params = {}) => {
    let { dispatch, router, log, journeyType, shouldNavigate = true, language } = params
    dispatch({ type: "GET_QUOTATION", data: { results: log, journeyType } })
    if (shouldNavigate) {
        router.push(`${language === 'en' ? "/quotation-results" : `${language}/quotation-results`}`)
    }
}

//when we click getQuotations there we check fields .If fields not empty then it will be triggering
//when we click getQuotations there we check fields .If fields not empty then it will be triggering

/**
* Fetches quotation options and either saves them or redirects the user based on parameters.
* Designed to be triggered after form field validation is passed.
*
* @async
* @function readyToCollectQuotationOptions
* @param {Object} params
* @param {Function} params.dispatch - Redux dispatch function.
* @param {Function} params.setInternalState - Local state setter (e.g., useState) to manage UI loading/errors.
* @param {Object} params.router - Next.js router for navigation.
* @param {number|string} params.journeyType - Journey type: 0 = one-way, 1 = return.
* @param {Array} params.reservations - List of reservations (each may include pickup, dropoff, time, etc.).
* @param {string} params.language - Language code to determine navigation path.
* @param {boolean} [params.shouldNavigate=true] - Whether to redirect to `/quotation-results` on success.
*/
export const readyToCollectQuotationOptions = async (params = {}) => {
    let { dispatch, setInternalState, router, journeyType, reservations, language, shouldNavigate = true, env, currencyId } = params;

    try {
        setInternalState({ ["quotation-loading"]: true });

        let log = await collectQuotationsAsync({ reservations, journeyType, env, currencyId });

        let { status, data } = log;

        if (status === 200) {
            setInternalState({ ["error-booking-message-1"]: "" });
            setInternalState({ ["error-booking-message-0"]: "" });

            pushToQuotationsResultPage({ dispatch, router, log: parseInt(journeyType) === 0 ? data[0] : data, journeyType, language, shouldNavigate });

            return { success: true, data: log.data }; // ✅ Başarılı sonucu döndür
        } else {
            let [transferData, returnData] = log.data;

            if (transferData) {
                if (transferData.status === 400) {
                    setInternalState({ ["error-booking-message-0"]: transferData.error.transferDateTimeString || "Early Transfer Datetime is not allowed" });
                }
            }

            if (returnData) {
                if (returnData.status === 400) {
                    setInternalState({ ["error-booking-message-1"]: returnData.error.transferDateTimeString || "Early Return Transfer Datetime is not allowed" });
                }
            }

            return { success: false, data: log.data }; // ❗️ Hatalı sonucu döndür
        }
    } catch (error) {
        console.error("Error collecting quotations:", error);
        return { success: false, error };
    } finally {
        setInternalState({ ["quotation-loading"]: false });
    }
};
