import axios from 'axios';

export default (function () {
  const method = 'get';
  const getFunction = (url, params) => {
    return axios({
      method,
      url,
      params,
    })
      .then(res => res.data);
  };
  return {
    getFeedbacks() {
      return getFunction('/feed_back/get_all')
    },
    getUserFeedback(phoneUuid) {
      return getFunction('/feed_back/get_phone_all', { phoneUuid });
    },
  };
})()
