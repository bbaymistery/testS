import React from 'react';
import { useDispatch } from 'react-redux';
import { ifHasUnwantedCharacters } from '../../../../helpers/ifHasUnwantedCharacters';
import TextInput from '../../../../components/elements/TextInput';
import styles from "./styles.module.scss"
import { useUserIp } from '../../../../hooks/userIp';
import PhoneInput from 'react-phone-input-2';
import Select from '../../../../components/elements/Select';
const HandlePassengerDetailsTransferForm = (props) => {
    let { passengerDetailsStatus, index, appData, reservationError, firstname, email, passengersNumber, phone, quotation,  } = props
    const dispatch = useDispatch()
    const { ip, country } = useUserIp();
    //we use it to render paxs inside select component
    const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
    //for passengers information
    const onPassengerDetailsHandler = (e, index) => {
        let { name, value } = e.target;
        //hinder user  to add some Characters
        if (ifHasUnwantedCharacters(value)) return

        if (['firstname', 'email',].includes(name))
            dispatch({ type: 'SET_PASSEGER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })

        if (['passengersNumber', "specialRequests"].includes(name))
            dispatch({ type: 'SET_TRANSFER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })

    }


    const handleOnChangeNumberInput = (value, _country, index, name) => {
        dispatch({ type: 'SET_PASSEGER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })
    };


    return (index === 0 || (!passengerDetailsStatus && index === 1) ?
        <div className={styles.passenger_details_div}>
            {index === 0 ? <h2> {appData?.words['strPassengerDetails']}</h2> : <h2 className={styles.return_pas_details_header}>{appData?.words["strReturnJourneyPassengerDetails"]}</h2>}
            <div className={styles.passenger_details}>
                <div className={styles.input_div}>
                    <TextInput label={appData?.words["strFullName"]} type="text" name="firstname" onChange={e => onPassengerDetailsHandler(e, index)} value={firstname} errorMessage={reservationError?.passengerDetails?.firstname} />
                </div>
                <div className={styles.input_div}>
                    <TextInput label={appData?.words["strEmail"]} type="text" name="email" onChange={e => onPassengerDetailsHandler(e, index)} value={email} errorMessage={reservationError?.passengerDetails?.email} />
                </div>
                <div className={styles.input_div}>
                    <Select label={appData?.words["strNoofPassengers"]} name="passengersNumber" onChange={e => onPassengerDetailsHandler(e, index)} value={passengersNumber} data={carObject[quotation.carId]?.pax} />
                </div>
                <div className={styles.input_div}>
                    <PhoneInput
                        className={`phone_input`}
                        value={phone}
                        onChange={(value, selectedCountry) => handleOnChangeNumberInput(value, selectedCountry, index, "phone")}
                        country={country.toLowerCase()}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            style: { border: reservationError?.passengerDetails?.phone ? '1px solid red' : ' 1px solid #ced4da' }
                        }}
                    />
                </div>
            </div>
        </div> : <React.Fragment></React.Fragment>
    )
}

export default HandlePassengerDetailsTransferForm