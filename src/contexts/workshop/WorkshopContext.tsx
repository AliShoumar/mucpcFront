import { useReducer , Children, useContext, createContext} from 'react';

const initState = {
	workshops: [],
};

const enum REDUCER_ACTION_TYPE {
	SET_WORKSHOPS,
}

type ReducerAction = {
	type: REDUCER_ACTION_TYPE;
};

const reducer = (
	state: typeof initState,
	action: ReducerAction
): typeof initState => {
	switch (action.type) {
		case REDUCER_ACTION_TYPE.SET_WORKSHOPS:
			return { ...state, workshops };
		default:
			throw new Error();
	}
};

const WorkshopContext = createContext(initState);
const WorkshopProvider = ({ children }) => {
    return (
        <WorkshopContext.Provider>
            {children}
        </WorkshopContext.Provider>
    );
};
