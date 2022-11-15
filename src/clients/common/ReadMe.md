# Library Packages

The following is the list of packages that need to be installed when converting this folder into a package:

- i18next
- react-i18next
- axios
- axios-case-converter
- socket.io-client
- react-use-websocket
- url

## Setup

You need to setup the following:

### Translation

```js
// Set Translation for the APP.
setTranslation(RNLanguageDetector);
```

### Axios

```js
// Setup Axios Interceptor for the Request.
useEffect(() => {
  setupAxiosRequestInterceptor({
    ...store,
    navigation: () => navigation.dispatch(StackActions.replace("Login")),
  });
}, []);
```
