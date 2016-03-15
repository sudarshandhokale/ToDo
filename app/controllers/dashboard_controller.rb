class DashboardController < ApplicationController
  before_filter :check_user, only: :index

  def index
    @users = current_user.developer_wise
    respond_to do |format|
      format.html
      format.json { render json: @users.as_json, status: :ok }
    end
  end

  def create
    @projects = current_user.projects
    render json: @projects.as_json, status: :ok
  end

  private

  def check_user
    return redirect_to todos_path \
    unless current_user.role_name.eql? ADMIN
  end
end
