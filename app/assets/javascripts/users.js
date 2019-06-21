$(function(){
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('#user-search-result').append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $('#user-search-result').append(html);
  }

  function appendMember(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('#member-result').append(html);
  }

  $('#user-search-field').on('keyup', function(){
    var members = [];
    $('input:hidden[name="group[user_ids][]"]').each(function(i, id){
      members.push($(this).val());
    });
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {
        keyword: input,
        members: members
      },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });
  $(document).on('click', '.chat-group-user__btn--add', function(){
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    $(this).parent().remove();
    appendMember(user_id, user_name);
  });
  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});