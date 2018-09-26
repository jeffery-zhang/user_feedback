import $ from 'jquery'
import get from 'service/get'
import post from 'service/post'
import getQuery from 'service/getQuery'

import './common';

$(() => {
  function getFeedbacks() {
    get.getFeedbacks().then(res => {
      console.log(res);
    })
  }

  getFeedbacks()
});