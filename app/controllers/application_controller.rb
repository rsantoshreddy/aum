class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  
  def index
    render 'layouts/application'
  end
  
  private
  
  def authenticate_user!
    unless current_user
      respond_to do |format|
        format.html do
          redirect_to '/login', status: :see_other unless 
            request.path == '/login' || 
            request.path == '/signup'
        end
        format.json do
          render json: { error: 'Not authenticated' }, status: :unauthorized
        end
      end
    end
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end
  helper_method :current_user
end
