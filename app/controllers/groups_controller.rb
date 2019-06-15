class GroupsController < ApplicationController
  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      flash[:notice] = "グループを作成しました"
      redirect_to root_path
    else
      render "new"
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    group = Group.update(group_params)
    redirect_to root_path
  end

  private

  def group_params
    params.require(:group).permit(:name, {user_ids: []})
  end
end
