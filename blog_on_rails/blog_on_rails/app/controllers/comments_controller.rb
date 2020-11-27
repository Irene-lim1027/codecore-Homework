class CommentsController < ApplicationController

    def create
        @post = Post.find params[:post_id]
        @comment.user = current_user
        @comment = Comment.new params.require(:comment).permit(:body)
        @comment.post = @post

        if @comment.save
            redirect_to post_path(@post)
        else
            render post_path  
            #posts#show
        end
    end

    def destroy  #Why???? No route matches [GET] "/posts/2/comments/1"
        @comment = Comment.find params[:id]
        @comment.destroy
        redirect_to post_path(@comment.post)
    end
        #posts#show go back to comment/post
end
