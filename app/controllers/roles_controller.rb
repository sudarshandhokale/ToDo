class RolesController < ApplicationController
  skip_before_filter :authenticate_user!

  def index
    @roles = Role.all
    respond_to do |format|
      format.html
      format.json { render json: @roles.as_json, status: :ok }
    end
  end
end
