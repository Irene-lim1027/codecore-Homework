Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

   get('/posts', { to: 'posts#index'})
  # get('/posts/new', { to: 'posts#new'})
  # post('/posts', { to: 'posts#create'})
  # get('/posts/:id', {to: 'posts#show'})
  # get('/posts/:id/edit', {to: 'posts#edit'})
  # patch('/posts/:id', {to: 'posts#update'})
  # delete('/posts/:id', {to: 'posts#delete'})
  root 'posts#index'

  resources :posts do
  resources :comments, only: [:create, :update, :destroy]
  end 

  get '/sign_up', to: "users#new"
  resources :users, only: [:create, :edit, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]

  get "/users/:id/change_password", { to: "users#password_edit", as: "edit_password" }
  patch "/users/:id/change_password", { to: "users#password_update", as: "update_password" }
end
