class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      sign_in(user)
      render json: { logged_in: true, user: user }
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  def destroy
    sign_out(current_user)
    render json: { logged_out: true }
  end
end 