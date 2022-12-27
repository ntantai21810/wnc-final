import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import Notification from "./components/Notification";
import theme from "./configs/theme";
import DialogProvider from "./provider/dialog-provider";
import { persistor, store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey="6LdZEXkjAAAAAA-KhLTsOUZKOKRtqr5fpw7c6jrW">
      <GoogleReCaptcha onVerify={(token) => console.log({ token })} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <GlobalStyles
              styles={{ a: { color: "unset", textDecoration: "none" } }}
            />
            <CssBaseline />

            <DialogProvider>
              <App />
            </DialogProvider>

            <Notification />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
