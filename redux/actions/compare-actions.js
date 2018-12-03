import {actionTypes} from "../constants/action-types"


export const addToCompare = (payload) => dispatch => {
    return dispatch({ type: actionTypes.ADD_TO_COMPARE, payload })
}
export const loadCompareIssue = (payload) => dispatch => {
    return dispatch({ type: actionTypes.LOAD_COMPARE_ISSUES, payload })
}
export const loadComparePoliticians = (payload) => dispatch => {
    return dispatch({ type: actionTypes.LOAD_COMPARE_POLITICIANS, payload })
}
export const selectIssueValue = (payload) => dispatch => {
    return dispatch({ type: actionTypes.SELECT_ISSUE_VALUE, payload })
}
export const removeFromCompare = (payload) => dispatch => {
    return dispatch({ type: actionTypes.REMOVE_FROM_COMPARE, payload });
}
export const setCompareValue = (payload) => dispatch => {
    return dispatch({ type: actionTypes.SET_COMPARE_VALUE, payload });
}