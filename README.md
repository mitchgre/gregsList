It basically doesn't look like much, but underneath the surface there's a lot going on.  
It's not a system that currently has a lot of data, instead it's a fairly complex skeleton 
which can be used to format data towards a 2 hour job search strategy.  

There's something like 2500 lines of javascript code executed in the browser to create and 
maintain a "gregsList" object.  Most of this is invisible to a user, however I found this to
be an interesting exercise on object-oriented programming which is finally starting to become
a subconcious design pattern in my head.

On the server there's another couple thousand lines of code that interacts with the "gregsList" object.   
I created four strange projects to build the server -   1. a butler, 2. an engineer, 3. an accountant 
and 4. an existentialist.

The butler just takes requests from the client.  Originally, the butler would perform the requests 
himself, but as the code grew towards 1000 lines, I decided to break the butler apart so that all 
he does is take requests full time and get something else to actually perform the requests.  In this 
sense, he's sort of like a map or an object class.  

I created an "engineer" that would do a lot of the general purpose utilitarian things like prepare statements 
for SQL queries, facilitate database connections, and that's basically it.  He doesn't really do much, but what
he does is used frequently throughout the project and  I can use him for other things in the future hopefully 
as I give him more skills. 

The accountant on the other hand is very overworked.  He weighs in around 1303 lines of code, and I couldn't 
think of a way to decompose his work load in the short last week of final projects and exams. 
Basically the accountant works directly with the database queries.   Almost all of the queries are stored in this
file, and as the file progressed, the API became cleaner as my understanding of the necessary design patterns
became more clear.   As a result some of the earlier functions in the accountant are much more complex and unwieldly
than they need to be.   

The interesting task here is to try to abstract the mysqli interface into something usable.  This isn't a great job
of doing that, but it's a start, and I'm better off than I was before I started. 
