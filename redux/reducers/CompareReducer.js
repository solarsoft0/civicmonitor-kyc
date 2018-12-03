import { actionTypes } from "../constants/action-types";

export const initialState = {
  issues: [],
  compare: [],
  status: {
    type: "",
    text: "",
    counter: 0
  },
  politicians: []
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
          politicians: state.politicians,
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
          politicians: state.politicians,
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
          politicians: state.politicians,
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
        compare: state.compare.filter(function(obj) {
          return obj.id !== payload.id;
        }),
        status: {
          type: "success",
          text: "Candidate Removed",
          counter: state.counter + 1
        }
      };

    case actionTypes.LOAD_COMPARE_ISSUES:
      return {
        selectedIssueValue: state.selectedIssueValue,
        issues: payload,
        compare: state.compare,
        status: state.status,
        politicians: state.politicians
      };
    case actionTypes.LOAD_COMPARE_POLITICIANS:
      return {
        selectedIssueValue: state.selectedIssueValue,
        issues: state.issues,
        compare: state.compare,
        status: state.status,
        politicians: payload
      };
    case actionTypes.SET_COMPARE_VALUE:
      if (payload.type == 1) {
        console.log(payload);
        let newCompare = [...state.compare];
        newCompare[0]= payload;
        return {
          selectedIssueValue: state.selectedIssueValue,
          issues: state.issues,
          compare: newCompare,
          status: state.status,
          politicians: state.politicians
        };
      }
      else if (payload.type == 2) {
        console.log(payload);
        let newCompare = [...state.compare];
        newCompare[0] = payload;
        return {
          selectedIssueValue: state.selectedIssueValue,
          issues: state.issues,
          compare: state.compare.reduce(function (acc, curr, index) {
            if (index == 1) {
              acc.push(payload);
            } else {
              acc.push(curr);
            }
            return acc;
          }, []),
          status: state.status,
          politicians: state.politicians
        };
      } else {
        return {
          selectedIssueValue: state.selectedIssueValue,
          issues: state.issues,
          compare: state.compare,
          status: state.status,
          politicians: state.politicians,
          status: {
            type: "error",
            text: "Something went wrong",
            counter: state.counter + 1
          }
        };

      };
    case actionTypes.SELECT_ISSUE_VALUE:
      return {
        selectedIssueValue: payload,
        issues: state.issues,
        politicians: state.politicians,
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
