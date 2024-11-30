class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      sign_in(user)
      token = generate_token(user)
      expiration_time = 15.minutes.from_now
      cookies.signed[:auth_token] = { value: token, httponly: true, expires: expiration_time }
      cookies.signed[:last_activity] = { value: Time.current.to_i, httponly: true, expires: expiration_time }
      render json: { logged_in: true, user: user }
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  def destroy
    sign_out(current_user)
    render json: { logged_out: true }
  end

  def check
    token = cookies.signed[:auth_token]
    last_activity = cookies.signed[:last_activity]
    
    if token && last_activity && valid_token?(token) && active_session?(last_activity)
      user = find_user_from_token(token)
      cookies.signed[:last_activity] = { value: Time.current.to_i, httponly: true, expires: 15.minutes.from_now }
      render json: { logged_in: true, user: user }
    else
      cookies.delete(:auth_token)
      cookies.delete(:last_activity)
      render json: { logged_in: false }
    end
  end

  private

  def active_session?(last_activity_timestamp)
    last_activity_time = Time.at(last_activity_timestamp.to_i)
    Time.current - last_activity_time <= 15.minutes
  end

  def generate_token(user)
    JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base)
  end

  def valid_token?(token)
    JWT.decode(token, Rails.application.secrets.secret_key_base)
  rescue JWT::DecodeError
    false
  end

  def find_user_from_token(token)
    decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base)
    user_id = decoded_token.first['user_id']
    User.find_by(id: user_id)
  end
end 