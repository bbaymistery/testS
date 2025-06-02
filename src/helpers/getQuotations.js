const collectQuotations = (params = { 'reservations': Object(), 'journeyType': Number(), 'env': Object(), "currencyId": Number() }, callback = () => { }) => {

  let { reservations, journeyType, env, currencyId } = params

  //transfer
  let trSelectedPickPoints = reservations[0]?.selectedPickupPoints;
  let trSelectedDroppPoints = reservations[0]?.selectedDropoffPoints;
  let transferDAteTimeString = reservations[0]?.transferDetails?.transferDateTimeString;
  //return
  let returnPickPoints = reservations[1]?.selectedPickupPoints;
  let returnDroppPoints = reservations[1]?.selectedDropoffPoints;
  let returnDAteTimeString = reservations[1]?.transferDetails?.transferDateTimeString;

  const url = `${env.apiDomain}/api/v1/quotation`;
  const method = "POST"
  const headers = { "Content-Type": "application/json" }

  const configTransfer = {
    method,
    headers,
    body: JSON.stringify({
      'selectedPickupPoints': trSelectedPickPoints,
      'selectedDropoffPoints': trSelectedDroppPoints,
      'transferDateTimeString': transferDAteTimeString,
      "accountId": 2964,
      "currencyId": currencyId
    }),
  };


  const configReturn = {
    method,
    headers,
    body: JSON.stringify({
      'selectedPickupPoints': returnPickPoints,
      'selectedDropoffPoints': returnDroppPoints,
      'transferDateTimeString': returnDAteTimeString,
      "accountId": 2964,
      "currencyId": currencyId
    }),
  };
  let __requests = parseInt(journeyType) === 0 ? [fetch(url, configTransfer)] : [fetch(url, configTransfer), fetch(url, configReturn)];


  Promise.all(__requests)
    .then(function (responses) { return Promise.all(responses.map(function (response, index) { return response.json() })) })
    .then(function (data) {

      if (data.every(o => o.status === 200)) {
        callback({ 'status': 200, data })
      } else {
        callback({ "status": 400, data });
      }
    })
    .catch(function (error) {
      callback({ 'status': 400, 'message': error.message })

      let message = "ISTANVBUL TRANSFERS   _collectQuotations()  function catch blog  else part of>> parseInt(journeyType) === 0"
      window.handelErrorLogs(error, message, { configReturn })
    });
}

export const collectQuotationsAsync = (params = {}) => new Promise((rs, rj) => collectQuotations(params, log => rs(log)))

// const main = 
