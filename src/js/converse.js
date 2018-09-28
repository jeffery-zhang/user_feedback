import $ from 'jquery'
import get from 'service/get'
import getQuery from 'service/getQuery'

import './common';
import post from '../service/post';

$(() => {
  const phoneUuid = getQuery('phoneUuid')
  const target = getQuery('target')

  function getUserFeedback(phoneUuid) {
    get.getUserFeedback(phoneUuid).then(res => {
      const data = res.data
      generateDom(data)
    })
  }

  function generateDom(data) {
    let html = ''
    data.forEach(item => {
      html += `<div class="column clearfix">
                <span class="avatar ${item.target < 2 ? 'client' : 'service'} ${item.target == target ? 'right' : 'left'}"></span>
                <div class="bubble ${item.target == target ? 'right' : 'left'}">
                  ${item.content}
                </div>
              </div>`
      $('.swap-box').html(html)
    })
  }

  function sendMsg(content) {
    if (!content) return;
    const method = target == 1 ? 'userSend' : 'manageSend'
    post[method](content, phoneUuid).then(res => {
      if (res.result) {
        getUserFeedback(phoneUuid)
      }
    })
  }

  getUserFeedback(phoneUuid)

  $('.reply').on('keyup', function(event) {
    const content = $(this).val()
    if (event.keyCode == 13) {
      $(this).val('')
      sendMsg(content)
    }
  })

  $('.send').on('click', () => {
    const content = $('.reply').val()
    $('.reply').val('')
    sendMsg(content)
  })
});