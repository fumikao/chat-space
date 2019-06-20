$(function() {
  function buildHTML(message){
    var body = message.body ? `${message.body}` : "";
    var image = message.image ?  `<img src=${message.image}>` : "";
    var html = `<div class="message" data-id=${message.id}>
                    <div class="message__top">
                      <div class="message__top-name">
                        ${message.user_name}
                      </div>
                      <div class="message__top-time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      <p>${body}</p>
                      ${image}
                    </div>
                  </div>`
                  return html;
  }

  function scrollMessages(){
    var target = $('.message').last();
    var position = target.offset().top + $('.main-messages').scrollTop();
    $('.main-messages').animate({
      scrollTop: position
    }, 1000, 'swing');
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-messages').append(html);
      $('#new_message')[0].reset();
      scrollMessages();
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(function(){
      $("input[type=submit]").removeAttr("disabled");
    })
  })

  var reloadMessages = function(){
    var last_message_id = $('.message:last').data('id');
    $.ajax({
      url: './api/messages',
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(data){
      $.each(data, function(i, data){
        var html = buildHTML(data);
        $('.main-messages').append(html);
        scrollMessages();
      })
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
  };
  if (location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 5000);
  }
});