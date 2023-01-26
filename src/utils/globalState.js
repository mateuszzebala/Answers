import {createGlobalState} from 'react-hooks-global-state'

const {setGlobalState, useGlobalState} = createGlobalState({
    username: null,
    login: false,
    loaded: false,
    message: "",
    is_superuser: null,
})

export {useGlobalState, setGlobalState}
