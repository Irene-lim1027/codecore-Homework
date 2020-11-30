    class CommentsController < ApplicationController

        def create
            @post = Post.find params[:post_id]
            @comment = Comment.new params.require(:comment).permit(:body)
            @comment.post = @post

            if @comment.save
                redirect_to post_path(@post)
            else
                render post_path  
                #posts#show
            end
        end

        def destroy  
            @comment = Comment.find params[:id]
            @comment.destroy
            redirect_to post_path(@comment.post)
        end
            
    end
