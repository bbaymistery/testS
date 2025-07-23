import "../styles/global.scss";
import { useEffect, useState, } from "react";
import { Provider, useDispatch, } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import { loaduserIfExist } from "../store/authReducer/authAction";
import { getCookie } from "../helpers/cokieesFunc";
import { useRouter } from "next/router";
import { LOGIN_SUCCESS } from "../store/authReducer/authTypes";
import useTokenCheckService from "../hooks/useTokenCheckService";
import Alert from "../components/elements/Alert";
import { fetchConfig } from "../resources/getEnvConfig";

// import "../components/elements/PopoverLabel/style.css";
function MyApp({ Component, pageProps }) {
  let { env } = pageProps
  const router = useRouter();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ alert: false, message: "", close: false, });
  const checkToken = useTokenCheckService(setAlert);

  //it comes from app_js Initialprops beloww js serVerSide props
  let { paymentTypes, appData } = pageProps

  useEffect(() => {
    if (typeof window === 'object') {
      window.handelErrorLogs = (error = {}, location = '', logs = {}) => {
        let raw = {};
        try {
          let { name, message, stack } = typeof error === 'string' ? new Error(error) : error;
          raw = { "error": { name, message, stack }, "location": location, "logs": logs };
        } catch (e) {
          raw = { "error": { ...e, ...error }, "location": location, "logs": logs };
        }

        let requestOptions = { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(raw) };

        if (!env.websiteDomain.includes("localhost")) {
          try {
            fetch(`${env.apiDomain}/tools/add-error-logs`, requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
    // Getting app data cartypes ..ext and save on store
    dispatch({ type: "GET_APP_DATA", data: { paymentTypes, appData } })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData, paymentTypes, dispatch])

  //reloading user
  useEffect(() => {
    if (getCookie("user-id") && getCookie("x-auth-token")) {
      let id = getCookie("user-id");
      let authToken = getCookie("x-auth-token");
      dispatch(loaduserIfExist(id, authToken, router));
    }

    // Check for user data in Local Storage
    const userData = localStorage.getItem("user");
    const channelId = +localStorage.getItem("channelId");
    const accountId = +localStorage.getItem("accountId");
    // Dispatch the user data to Redux
    dispatch({ type: LOGIN_SUCCESS, payload: JSON.parse(userData) });
    dispatch({ type: 'SET_ACCOUNT_ID', data: { channelId, accountId } })

    const interval = setInterval(() => {
      checkToken()

    }, 420002); // Check every 7minutes (420000 ms)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [dispatch, router, checkToken]);


  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (isClient && <Provider store={store}>
    {alert.alert && (
      <Alert
        setAlert={setAlert}
        alert={alert}
        message={alert.message}
        close={alert.close}
        error={alert.error}
        warning={alert.warning}
      />
    )}
    <Component {...pageProps} />
  </Provider>)
}
const makestore = () => store;
const wrapper = createWrapper(makestore);
MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {

  const env = await fetchConfig();

  let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  let appDataInitial = store.getState().initialReducer?.appData
  let paymentTypesInitial = store.getState().initialReducer?.paymentTypes
  // Pathname kontrolü
  const excludePaths = ['/news', '/blog'];
  const isExcluded = excludePaths.some((path) => ctx?.req?.url.toLowerCase().startsWith(path));

  // Fetch app data and payment types
  if (ctx?.req?.url) {

    const appDataUrl = `${env.apiDomain}/app/en`;
    const cdnDataUrl = `https://cdn.london-tech.com/app/en.json`;
    let goFurtherToCdn = false
    let __appDataInitial = {}
    try {
      let requestFetch = await fetch(appDataUrl);
      __appDataInitial = await requestFetch.json();
      if ((__appDataInitial || {}).status !== 200) {
        goFurtherToCdn = true
      }

    } catch (error) {
      __appDataInitial = appDataInitial || {}
      goFurtherToCdn = true
    }
    try {
      if (goFurtherToCdn) {
        let requestFetch2 = await fetch(cdnDataUrl, { headers: { 'Cache-Control': 'no-cache' }, method: 'GET' });
        __appDataInitial = await requestFetch2.json();
      }
    } catch (error) {

    }

    __appDataInitial = __appDataInitial || {};

    appDataInitial = __appDataInitial
    paymentTypesInitial = __appDataInitial.paymentTypes || [];

    if (isExcluded) {
      // Eğer rota /News veya /blog ile başlıyorsa verileri null yap
      store.dispatch({ type: "GET_APP_DATA", data: { appData: null, paymentTypes: null, } });
    } else {
      // Dispatch values to Redux store
      store.dispatch({ type: "GET_APP_DATA", data: { appData: appDataInitial, paymentTypes: paymentTypesInitial, } });
    }

  }

  if (isExcluded) {
  // return { pageProps: { appData: appDataInitial, paymentTypes: paymentTypesInitial, env } }
    //
    pageProps = { hasLanguage: "en", appData: null, paymentTypes: null, env}
  } else {
    pageProps = { appData: appDataInitial, hasLanguage: "en", env, }
  }
  return { pageProps: { ...pageProps, } };
});
export default wrapper.withRedux(MyApp);
