import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import Routes from './routes/Routes';
import configureStore from './redux/store';
import CssBaseline from './components/commons/CssBaseLine';

const store = configureStore();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Routes />
            </Provider>
        </ThemeProvider >
    );
};

export default App;