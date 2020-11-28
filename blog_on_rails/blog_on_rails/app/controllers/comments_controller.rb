class CommentsController < ApplicationController

    before_action :authenticate_user!, except:[:index, :show]

    def create
        @post = Post.find params[:post_id]
        @comment = Comment.new params.require(:comment).permit(:body)
        @comment.post = @post
        @comment.user = current_user

        if @comment.save
            redirect_to post_path(@post)
        else
            render post_path
       
        end
    end

    def destroy 
        
        @comment = Comment.find params[:id]
        if can? :crud, @comment
        @comment.destroy
        redirect_to post_path(@comment.post)
        else
        @post = Post.find params[:post_id]
        flash[:danger] = "Access Denied"
        redirect_to post_path(@post)
        end
    end
end
