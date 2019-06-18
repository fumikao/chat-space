$(function() {
  function buildHTML(message){
    var body = message.body ? `${message.body}` : "";
    var image = message.image ?  `<img src=${message.image}>` : "";
    var html = `<div class="message">
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
      $('#message_body').val('');
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(function(){
      $("input[type=submit]").removeAttr("disabled");
    })
  })
});