class ApplicationController < ActionController::Base
    
    private

    def current_user
      if session[:user_id].present?
        @current_user ||= User.find session[:user_id]
      end
    end
    helper_method :current_user
  
    def user_signed_in?
      current_user.present?
    end
    helper_method :user_signed_in?
  
    def authenticate_user!
      unless user_signed_in?
        flash[:danger] = "Sign in before trying that!"
        redirect_to new_session_path
      end
    end
  end
  





#     def authenticate_user!
#         redirect_to new_session_path, notice:"Please Sign in" unless user_signed_in?
#     end
    
    
#     def user_signed_in?
#         current_user.present?
#     end
#     helper_method :user_signed_in?
    
    
#     def current_user
#         if session[:user_id].present?
#             @current_user || User.find session[:user_id]
#         end
#         # @current_user ||=User.find_by_id session[:user_id]
#     end
#     helper_method :current_user
# end
