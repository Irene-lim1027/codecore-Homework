    class PostsController < ApplicationController
    
        before_action :authenticate_user!, except:[:index, :show]
        before_action :authorize_user!, only:[:edit,:update,:destroy]
        before_action :find_post, only: [:show, :edit, :update, :destroy]

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
            @comment = Comment.new
            @comments = @post.comments
        end

        def edit
        end

        def update
            if @post.update params.require(:post).permit(:title, :body)
            redirect_to post_path(@post)
            else
            render :edit
            end
        end

        def destroy
            @post.destroy
            redirect_to posts_path 
        end

    end

    private

        def find_post
            @post = Post.find params[:id]
        end

        def authorize_user!
            unless can? :crud, @post
            flash[:danger] = "Access Denied"
            redirect_to root_path
        end
        
    end
          