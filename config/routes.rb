Rails.application.routes.draw do
  # API routes for authentication
  post '/users', to: 'users#create'
  post '/sessions', to: 'sessions#create'
  delete '/sessions', to: 'sessions#destroy'
  get '/auth/check', to: 'sessions#check'

  # Client-side routes
  get '/login', to: 'application#index'
  get '/signup', to: 'application#index'
  
  root 'application#index'
  
  # Catch all routes for client-side routing
  get '*path', to: 'application#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
