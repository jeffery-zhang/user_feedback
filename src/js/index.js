import $ from 'jquery'
import get from 'service/get'
import post from 'service/post'
import getQuery from 'service/getQuery'

import './common';

$(() => {
  function getFeedbacks() {
    $('.list').html('')
    get.getFeedbacks().then(res => {
      console.log(res.data);
      const data = res.data
      generateDom(data)
    })
  }

  function generateDom(data) {
    let html = ''
    data.forEach(item => {
      html += `<div class="issue" data-uuid="${item.uuid}">
                <div class="user">用户: ${item.uuid}</div>
                <div class="content ellipsis">问题: ${item.content}</div>
                <div class="status">
                  <span>${item.status > 1 ? '已解决' : '未解决'}</span>
                  <button data-uuid="${item.uuid}" class="set-status ${item.status == 2 ? 'hidden' : ''}">问题已解决</button>
                </div>
              </div>`
    })
    $('.list').html(html)

    $('.set-status').on('click', function(evnet) {
      event.stopPropagation()
      post.handleIssue($(this).data('uuid')).then(res => {
        getFeedbacks()
      })
    })

    $('.issue').on('click', function() {
      enterConverse($(this).data('uuid'))
    })
  }

  function enterConverse(uuid) {
    location.href = '/converse?target=2&phoneUuid=' + uuid;
  }

  getFeedbacks()
});