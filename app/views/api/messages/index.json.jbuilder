if @new_messages.present?
  json.array! @new_messages do |message|
    json.body         message.body
    json.image        message.image.url
    json.created_at   message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
    json.user_name    message.user.name
    json.id           message.id
  end
end