import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import actionItemsReducer from './ActionItemReducer';

const store = createStore(actionItemsReducer, applyMiddleware(thunk));

export const ReduxProvider = ({ children }) => (
    <Provider store={store}>
        {children}
    </Provider>
);
