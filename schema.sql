/*
	gregsList is a database driven web app to help direct a job hunt.
*/

# drop tables with foreign keys first
drop table if exists user_schedule;
drop table if exists company_contacts;
drop table if exists user_contacts;
drop table if exists user_goals;
drop table if exists user_industries;
drop table if exists company_industry;
drop table if exists company_locations;
drop table if exists user_locations;
drop table if exists postings;
drop table if exists `user_companies`;
drop table if exists `pass`;
drop table if exists `users`;


# table to contain users of gregsList
create table `users`(
       id int primary key unique auto_increment,
       `name` varchar(255) unique
)engine=innodb;


# insert base case users 
insert into `users` (`name`)
       values ("greg"),("mitchell");


# table to contain passwords
# this is a touchy subject, and I consider my implementation here
# crude and naive
create table `pass`(
       `word` varchar(255),
       `user` int,              	     
       foreign key (`user`) references users(id) 
       	       on delete set null on update cascade
)engine=innodb;

# include base cases for pass?
insert into `pass` (`user`,`word`)
       values (1,"pass"),(2,"1234");
# hash and salt these later, it's just an example, 
# we're not storing credit card info 

# list of companies
drop table if exists companies;
create table companies(
       id int primary key auto_increment,
       name varchar(255) unique
       # hiring_activity int,  # use joins here instead
       # url text
) engine=innodb;

# add some base case companies
insert into `companies` (`name`)
       values ("Microsoft"),
       	      ("Google"),
	      ("US Dept of Energy"),
	      ("Proctor & Gamble"),
       	      ("Berkshire Hathaway"),
	      ("Apple"),
	      ("Oregon State University"),
	      ("NASA"),
	      ("NSA"),
	      ("Wikipedia"),
	      ("Yahoo"),
	      ("Facebook"),
	      ("Twitter"),
	      ("Walmart"),
	      ("Coca Cola"),
	      ("Marvel Studios"),
	      ("Disney"),
	      ("United Airlines"),
	      ("Amazon"),
	      ("The Carney Group"),
	      ("Intel"),
	      ("Sanofi"),
	      ("NVIDIA"),
	      ("Qualcomm"),
	      ("General Motors"),
	      ("Monsanto");


# contains relations between users and companies
create table user_companies(
       id int primary key unique auto_increment,
       `user` int, # references users.id,
       company int, # references companies.id
       foreign key (`user`) references users(id)
       	       on delete set null on update cascade,
       foreign key (`company`) references companies(id)
       	       on delete set null on update cascade
)engine=innodb;




# add some base case user_companies

# the base case example is that the companies.name already exists in
# the companies table. 

insert into `user_companies` (`user`,company)
       values ( # example where the company name is already defined
		(select id from `users` where users.name="greg"),
		(select id from `companies` where companies.name="Google")
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="NASA")
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="US Dept of Energy")
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="Berkshire Hathaway")
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="United Airlines")
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="Intel")
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="Qualcomm")
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="NVIDIA")
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="General Motors")
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="The Carney Group")
		),

		# next user

       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Disney")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Coca Cola")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Oregon State University")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="United Airlines")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Amazon")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Berkshire Hathaway")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Wikipedia")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Facebook")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Twitter")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Walmart")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Intel")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="NSA")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Proctor & Gamble")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Yahoo")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="US Dept of Energy")
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Marvel Studios")
		);
       	      	
# in the event that the companies.name isn't defined, will have to
# resort to using php to process the companies.name insertion into
# companies first, and then pass the resulting id into user_companies.



# list of locations
drop table if exists locations;
create table locations(
       id int primary key auto_increment,
       name varchar(255) unique
)engine=innodb;

# locations base cases
insert into locations (name) 
 values ("south of france"),
 	("somewhere over the rainbow"),
	("west of the mississippi");
# above are valid examples of why *not* to break down into countries,cities, etc.




# contains relations between users and locations
create table user_locations(
       id int primary key auto_increment,
      `user` int, # references users.id,
      `location` int, # references locations.id
      foreign key (`user`) references users(id)
      		  on delete set null on update cascade,
      foreign key (`location`) references locations(id)
      	      	  on delete set null on update cascade
)engine=innodb;


# user_location base cases
insert into user_locations (`user`,`location`) 
 values (1,1),(1,2),(1,3),(2,3),(2,1);




# contains relations between companies and locations
create table company_locations(
       id int primary key auto_increment,
       `company` int, # references companies.id,
       `location` int, # references locations.id
       foreign key (`company`) references companies(id)
      		  on delete set null on update cascade,
       foreign key (`location`) references locations(id)
      		  on delete set null on update cascade
)engine=innodb;

# add base cases for company locations



# contains job postings
create table postings(
       id int primary key unique auto_increment,
       title varchar(255),
       url varchar(255),
       `user` int,
       company int, #references companies.id,
       location int, #references location.id,
       `source` varchar(255),   # this should reference a new table instead?
       foreign key (`user`) references users(id)
              on delete set null on update cascade,
       foreign key (`company`) references companies(id)
       	       on delete set null on update cascade,
       foreign key (`location`) references locations(id)
       	       on delete set null on update cascade
)engine=innodb;
# notes:
# couldn't separate postings from user.  It was too complicated to
# figure out how to remove postings if they weren't tied to a user id.


# insert some base case postings
insert into `postings` (`user`,`url`)
       values
       (1,"http://www.indeed.com/cmp/The-Carney-Group/jobs/Software-Engineer-Application-Developer-b67c029e9687804f"),
       (1,"https://us-amazon.icims.com/jobs/309767/it-support-engineer-ii/job?mode=job&iis=Indeed&iisn=Indeed+%28Free+Posting%29&mobile=false&width=1455&height=1200&bga=true&needsRedirect=false&jan1offset=-420&jun1offset=-420"),
       (1,"http://www.infinera.com/career/ourjobs.html?nl=1&jvi=oxTv0fwF,Job&jvs=Indeed&jvk=Job"),
       (2,"http://www.indeed.com/cmp/The-Carney-Group/jobs/Software-Engineer-Application-Developer-b67c029e9687804f");




# list of industries
drop table if exists industries;
create table industries(
       id int primary key auto_increment,
       name varchar(255) unique
)engine=innodb;



# add some base case industries.  (Expect these to grow and be somewhat random).
insert into `industries` (`name`)
       values ("government"),
       	      ("finance"),
	      ("aerospace"),
       	      ("medical"),
	      ("media"),
	      ("music"),
	      ("web"),
	      ("education"),
	      ("Agriculture"),
	      ("Food and Drug"),
	      ("automotive"),
	      ("real estate"), 
	      ("software engineering"),
	      ("communications"),
	      ("semiconductors"),
	      ("transportation"),
	      ("manufacturing");



# contains relations between companies and industries
create table company_industry(
       id int primary key auto_increment,
       company int, # references companies.id,
       industry int, # references industries.id
       foreign key (`company`) references companies(id)
      	  on delete set null on update cascade,
       foreign key (`industry`) references industries(id)
      	  on delete set null on update cascade
)engine=innodb;


# add some base case company-industry relations
insert into company_industry (company,industry)
       values	(2,7), # google-web
		(2,5), # google-media
		(2,2), # google-finance
		(2,13), # google-software engineering
		(2,14), # google- communications
		(3,1),
		(4,10),
		(7,1),
		(7,8),
		(8,1),
		(8,3),
		(9,1),
		(9,13),
		(9,14),
		(10,7),
		(11,7),
		(12,7),
		(13,7),
		(13,5),
		(13,13),
		(15,10),
		(16,5),
		(17,5),
		(18,16),
		(19,7),
		(21,17), # manufacturing
		(23,17),
		(24,17),
		(21,15),
		(23,15),
		(24,15);



# contains relations between users and industries
create table user_industries(
       id int primary key auto_increment,
       industry int, # references industries.id,
       `user` int, # references users.id
       foreign key (`industry`) references industries(id)
      		  on delete set null on update cascade,
       foreign key (`user`) references users(id)
      		  on delete set null on update cascade
)engine=innodb;


# base case user industries
insert into user_industries (`user`,`industry`)
       values	(2,7),(1,7),(2,13),(1,13),(1,2),(2,2),(1,14);




# contains goals 
drop table if exists goals;
create table goals(
       id int primary key auto_increment,
       `value` varchar(255)
)engine=innodb;

# base case goals

insert into goals (`value`)
       values ("get a better job"),
       	      ("find an ideal company"),
	      ("research companies"),
	      ("research industries"),
	      ("find contacts"),
	      ("schedule interviews");


# contains relations between users and goals
create table `user_goals`(
       id int primary key auto_increment,
       `user` int,# references users.id,
       `goal` int,# references goals.id
        foreign key (`user`) references users(id)
      		  on delete set null on update cascade,
       foreign key (`goal`) references goals(id)
      		  on delete set null on update cascade
)engine=innodb;

# base case user goals

insert into user_goals (`user`,`goal`)
       values (1,1),
       	      (1,2),
	      (1,3),
	      (1,4),
	      (1,5),
	      (1,6),
	      (2,1),	      
       	      (2,2),
	      (2,3),
	      (2,4),
	      (2,5),
	      (2,6);
              


# contains contacts
drop table if exists contacts;
create table contacts(
       id int primary key auto_increment,
       fname varchar(255),       
       lname varchar(255),
       email varchar(255),
       phone varchar(255),
       facebook varchar(255),
       linkedin varchar(255),
       github varchar(255)
)engine=innodb;

# base case contacts (current instructors this semester)

insert into contacts (fname,lname,email,linkedin,github)
       values ("ameneh", "sarbaziazad",
	       "sarbazia@onid.orst.edu","tbd",
	       "tbd"
	      ),
      	      (	"justin", "wolford",
		"wolfordj@engr.oregonstate.edu","tbd",
		"wolfordj"
		),
		(
		"samina","ehasan",
		"ehsan@eecs.oregonstate.edu",
		"tbd","tbd"
		);

# contains relations between users and contacts
create table user_contacts(
       id int primary key auto_increment,
       `user` int,# references users.id,
       contact int,# references contacts.id
       foreign key (`user`) references users(id)
      		  on delete set null on update cascade,
       foreign key (`contact`) references contacts(id)
      		  on delete set null on update cascade
)engine=innodb;

# base cases
insert into user_contacts (`user`,`contact`)
       values (1,1),(1,2),(1,3),
       	      (2,1),(2,2),(2,3);


# contains relations between companies and contacts
create table company_contacts(
       id int primary key auto_increment,
       `company` int,# references companies.id,
       contact int,# references contacts.id
       foreign key (`company`) references companies(id)
      		  on delete set null on update cascade,
       foreign key (`contact`) references contacts(id)
      		  on delete set null on update cascade
       
)engine=innodb;

# base cases
insert into company_contacts (`company`,`contact`)
       values 
       ((select id from companies where name="Oregon State University"), 1),
       ((select id from companies where name="Oregon State University"), 2),
       ((select id from companies where name="Oregon State University"), 3);



# contains schedules
drop table if exists schedule;
create table schedule(
       id int primary key auto_increment,
       `name` varchar(255),
       `description` text,
       `location` text,
       `contact` text,
       `url` text,
       `start` datetime,
       `end` datetime
)engine=innodb;

# base case schedule
insert into schedule (`name`,`description`,`start`,`end`)
       values 
       	      (
       	      "write up final project",
       	      "check against guidelines",
	      "2015-03-14", "2015-03-15"),
	      (
       	      "study for finals",
       	      "make note page",
	      "2015-03-15", "2015-03-19");



# contains relations between users and schedules
create table user_schedule(
       id int primary key auto_increment,
      `user` int,# references users.id,
      `schedule` int,# references schedule.id
       foreign key (`user`) references users(id)
      		  on delete set null on update cascade,
       foreign key (`schedule`) references schedule(id)
      		  on delete set null on update cascade
);

# base case
insert into user_schedule (`user`,`schedule`)
       values (1,1), (1,2),
       	      (2,1), (2,2);
       
	

