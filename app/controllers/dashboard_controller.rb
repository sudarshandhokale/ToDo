class DashboardController < ApplicationController
  before_filter :check_user, only: :index

  def index
    @users = current_user.developer_wise
    respond_to do |format|
      format.html
      format.json { render json: @users.as_json, status: :ok }
    end
  end

  private

  def check_user
    return redirect_to todos_path unless current_user.admin?
  end
end
