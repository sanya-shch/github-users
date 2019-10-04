import React, {Fragment} from 'react';

import Users from './components/users/Users';

import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <Fragment>
                <Users/>
            </Fragment>
        </Provider>
    );
};

export default App;
