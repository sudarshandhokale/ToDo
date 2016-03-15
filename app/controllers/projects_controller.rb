class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update,
    :destroy, :project_developer, :remove_developer]

  # GET /projects
  # GET /projects.json
  def index
    @projects = current_user.projects
    respond_to do |format|
      format.html
      format.json { render json: @projects.as_json, status: :ok }
    end
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    respond_to do |format|
      format.html
      format.json { render json: @project.as_json, status: :ok }
    end
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(project_params)
    @project.users << current_user
    if @project.save
      render json: @project.as_json, status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  # PATCH/PUT /projects/1.json
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
        format.json { render :show, status: :ok, location: @project }
      else
        format.html { render :edit }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project.users.destroy_all
    @project.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def project_developer
    @user = User.find_by_id(params[:developer_id])
    @project.users << @user unless developer_exist?
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def developer_exist?
    @project.users.pluck(:id).include? @user.id
  end

  def remove_developer
    user = User.find_by_id(params[:developer_id])
    @project.users.delete(user) if user
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(:name, :description)
    end
end
