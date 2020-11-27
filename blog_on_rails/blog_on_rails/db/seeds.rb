# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


  Comment.destroy_all
  Post.destroy_all
  User.destroy_all
  NUM_OF_COMMENTS = 60
  PASSWORD = 'apples'

  admin_user = User.create(
    first_name: 'Irene',
    last_name: 'Lim',
    email:'lala@gmail.com',
    password: PASSWORD,
    admin: true
  )

  10.times do 
    first_name=Faker::Name.first_name
    last_name=Faker::Name.last_name

      User.create(
        first_name:first_name,
        last_name: last_name,
        email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
        password: PASSWORD
        )
  end
  users=User.all

  100.times do
     #Faker::Time::between
      created_at = Faker::Date.backward(days:365)

        Post.create(
          title: Faker::Hacker.say_something_smart,
          body: Faker::Lorem.paragraph,
          created_at: created_at,
          updated_at: created_at,
          user: users.sample
          )
    end 

  posts =Post.all
  
   posts.each do |q|
      created_at = Faker::Date.backward(days:365)

    10.times do
        Comment.create({
          body: Faker::Hacker.say_something_smart,
          created_at: created_at,
          updated_at: created_at,
          post_id: q.id,
          user: users.sample
      })
    end
  end


comments = Comment.all


    
puts Cowsay.say("Generated #{posts.count} posts", :dragon)
puts Cowsay.say("Created #{comments.count} comments!", :cow)
puts Cowsay.say("Created #{users.count} users!", :frog)