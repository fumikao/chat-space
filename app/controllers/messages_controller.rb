class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      flash[:notice] = "メッセージが送信されました"
      redirect_to group_messages_path(@group)
    else
      @messages = @group.messages.includes(:user)
      flash[:alert] = "メッセージを入力してください。"
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end