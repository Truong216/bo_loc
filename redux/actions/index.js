import * as ActionTypes from '../actionTypes';
import { account } from '../../constants';

export const login = (accountInput) => {
  if(accountInput.name === account.name && accountInput.password === account.password) {
    return {
      type: ActionTypes.LOGIN,
      payload: {
        isLogin: true,
      },
    };
  } else {
    return {
      type: ActionTypes.LOGIN,
      payload: {
        isLogin: false,
        isWrong: true,
      },
    }; 
  }
}

export const logout = () => {
  return {
    type: ActionTypes.LOGOUT,
    payload: {
      id,
    },
  };
}

export const keyWordSuggestion = (keyword) => {
  return {
    type: ActionTypes.FETCH_KEYWORD,
    payload: {
      keyword,
    }
  }
}

export const fetchSuccessAction = (receivedKeyword) => {
  return {
    type: ActionTypes.FETCH_SUCCEEDED,
    payload: {
      receivedKeyword,
    }
  }
}

export const fetchFaildAction = (error) => {
  return {
    type: ActionTypes.FETCH_FAILD,
    payload: {
      error,
    }
  }
}