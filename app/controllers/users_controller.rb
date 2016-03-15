class UsersController < ApplicationController
  def index
    @users = User.developer
    authorize! :read, User
    respond_to do |format|
      format.html
      format.json { render json: @users.as_json, status: :ok }
    end
  end
end
