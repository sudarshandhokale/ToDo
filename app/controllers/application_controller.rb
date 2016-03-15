class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :set_gon
  before_filter :authenticate_user!
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, alert: exception.message
  end
  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :html, :json

  def set_gon
    gon.push(admin: verify_role(ADMIN), developer: verify_role(DEVELOPER))
  end

  def verify_role(role)
    return false unless current_user
    current_user.role_name.eql? role
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << [:full_name, :role_id]
  end
end
