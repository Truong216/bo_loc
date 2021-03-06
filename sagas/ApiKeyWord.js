const urlKeyWordSuggestion = 'http://13.250.18.254:5000/hotels/keywordsuggestion/'
import axios from 'axios'

function* getKeyWordSuggestion(keyword) {
  let response;
  yield axios.get(urlKeyWordSuggestion+keyword)
  .then(function (res) {
    // handle success
    response = res.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    return response;
  });
  return response;
}

export const Api = {
  getKeyWordSuggestion
}