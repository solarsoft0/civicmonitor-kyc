import { actionTypes } from "../constants/action-types";

export const initialState = {
  issues: [],
  compare: [],
  status: {
    type: "",
    text: "",
    counter: 0
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_TO_COMPARE:
      if (
        state.compare.filter(candidate => candidate.id === payload.id).length >
        0
      ) {
        return {
          compare: state.compare,
          issues: state.issues,
          selectedIssueValue: state.selectedIssueValue,
          status: {
            type: "error",
            text: "Candidate has been added already",
            counter: state.status.counter + 1
          }
        };
      } else if (state.compare.length > 1) {
        return {
          compare: state.compare,
          issues: state.issues,
          selectedIssueValue: state.selectedIssueValue,
          status: {
            type: "error",
            text: "You can Only Select Two Candidate",
            counter: state.status.counter + 1
          }
        };
      } else {
        return {
          compare: state.compare.concat(payload),
          issues: state.issues,
          selectedIssueValue: state.selectedIssueValue,
          status: {
            type: "success",
            text: "Candidate has been added",
            counter: 0
          }
        };
      }
    case actionTypes.REMOVE_FROM_COMPARE:
      return {
        selectedIssueValue: payload,
        issues: state.issues,
        compare: state.compare.filter(function (obj) {
          return obj.id !== payload.id;
        }),
        status: {
          type: "success",
          text: "Candidate Removed",
          counter: state.counter + 1
        }
      };

    case actionTypes.LOAD_COMPARE_ISSUE:
      return {
        issues: payload,
        compare: state.compare,
        status: state.status
      };
    case actionTypes.SELECT_ISSUE_VALUE:
      return {
        selectedIssueValue: payload,
        issues: state.issues,
        compare: state.compare,
        status: {
          type: "success",
          text: "Selected Issue Updated",
          counter: state.counter + 1
        }
      };

    default:
      return state;
  }
};
