class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]
  
  def create
    @user = User.new(user_params)
    puts "DEBUG: Attempting to create user: #{@user.email}"
    logger.info "DEBUG: Attempting to create user: #{@user.email}"
    Rails.logger.info "DEBUG: Attempting to create user: #{@user.email}"
    
    if @user.save
      puts "DEBUG: User successfully created: #{@user.email}"
      logger.info "DEBUG: User successfully created: #{@user.email}"
      Rails.logger.info "DEBUG: User successfully created: #{@user.email}"
      render json: { status: :created, user: @user }
    else
      puts "DEBUG: User creation failed: #{@user.errors.full_messages}"
      logger.error "DEBUG: User creation failed: #{@user.errors.full_messages}"
      Rails.logger.error "DEBUG: User creation failed: #{@user.errors.full_messages}"
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end 