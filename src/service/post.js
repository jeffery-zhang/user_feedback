import axios from 'axios'
import qs from 'qs'

export default (function () {
  const method = 'post';
  const postFunction = (url, params) => {
    const data = qs.stringify(params);
    return axios({
      method,
      url,
      data,
    })
      .then(res => res.data);
  };
  return {
    manageSend(content, phoneUuid) {
      return postFunction('/feed_back/system_post', { content, phoneUuid })
    },
    userSend(content, phoneUuid) {
      return postFunction('/feed_back/user_post', { content, phoneUuid })
    },
    handleIssue(phoneUuid) {
      return postFunction('/feed_back/set_handled', { phoneUuid })
    },
  };
})()
