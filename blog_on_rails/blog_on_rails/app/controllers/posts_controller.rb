class PostsController < ApplicationController
   
    before_action :authenticate_user!, except:[:index, :show]

    def index
        @posts= Post.all
    end

    def new
        @post = Post.new
    end

    def create
        @post = Post.new params.require(:post).permit(:title,:body)
        @post.user = current_user
        if @post.save
            flash[:notice]="Post created!💐"
            redirect_to posts_path
        else
            render :new
        end
    end

    def show
        @post = Post.find params[:id]
        @comment = Comment.new
        @comments = @post.comments
    end

    def edit
        @post = Post.find params[:id]
    end

    def update
        @post = Post.find params[:id]
        if @post.update params.require(:post).permit(:title, :body)
        redirect_to post_path(@post)
        else
        render :edit
        end
    end

    def destroy
        @post = Post.find params[:id]
        @post.destroy
        redirect_to posts_path 
    end

end
