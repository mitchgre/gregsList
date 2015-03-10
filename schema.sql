/*
	gregsList is a database driven web app to help direct a job hunt.
*/


# table to contain users of gregsList
drop table if exists `users`;
create table `users`(
       id int primary key unique auto_increment,
       `name` varchar(255) unique
);

# insert base case users 
insert into `users` (`name`)
       values ("greg"),("mitchell");


# list of companies
drop table if exists companies;
create table companies(
       id int primary key auto_increment,
       name varchar(255) unique,
       hiring_activity int,
       url text
);

# add some base case companies
insert into `companies` (`name`)
       values ("Microsoft"),("Google"),("US Dept of Energy"),("Proctor & Gamble"),
       	      ("Berkshire Hathaway"),("Apple"),("Oregon State University"),
	      ("NASA"),("NSA"),("Wikipedia"),("Yahoo"),("Facebook"),("Twitter"),
	      ("Walmart"),("Coca Cola"),("Marvel Studios"),("Disney"),("United Airlines"),
	      ("Amazon"),("The Carney Group"),("Intel"),("NVIDIA"),("Qualcomm");


# contains relations between users and companies
drop table if exists user_companies;
create table user_companies(
       id int primary key unique auto_increment,
       `user` int references users.id,
       company int references companies.id
);


# contains job postings
drop table if exists postings;
create table postings(
       id int primary key unique auto_increment,
       title varchar(255),
       url varchar(255) unique,
       location int references location.id,
       company int references companies.id
);

# insert some base case postings
insert into `postings` (`url`)
       values ("http://www.indeed.com/cmp/The-Carney-Group/jobs/Software-Engineer-Application-Developer-b67c029e9687804f"),("https://us-amazon.icims.com/jobs/309767/it-support-engineer-ii/job?mode=job&iis=Indeed&iisn=Indeed+%28Free+Posting%29&mobile=false&width=1455&height=1200&bga=true&needsRedirect=false&jan1offset=-420&jun1offset=-420"),("http://www.infinera.com/career/ourjobs.html?nl=1&jvi=oxTv0fwF,Job&jvs=Indeed&jvk=Job");




# contains relations between users and job postings
drop table if exists user_postings;
create table user_postings(
       id int primary key unique auto_increment,
       `user` int references users.id,
       posting int references postings.id
);

# add base case user_postings
insert into `user_postings` (`user`,posting)
       values (1,1),(1,2),(1,3),(2,3);  # link "greg" with the first three postings, "mitchell" with the last



# list of industries
drop table if exists industries;
create table industries(
       id int primary key auto_increment,
       name varchar(255) unique
);

# add some base case industries.  (Expect these to grow and be somewhat random).
insert into `industries` (`name`)
       values ("government"),("finance"),("aerospace"),
       	      ("medical"),("media"),("music"),("web"),
	      ("education"),("Agriculture"),("Food and Drug"),
	      ("automotive"),("real estate"),
	      ("communications"),("semiconductors"),("manufacturing");

# contains relations between companies and industries
drop table if exists company_industry;
create table company_industry(
       id int primary key auto_increment,
       company int references companies.id,
       industry int references industries.id
);

# contains relations between users and industries
drop table if exists user_industries;
create table user_industries(
       id int primary key auto_increment,
       industry int references industries.id,
       `user` int references users.id
);

# list of locations
drop table if exists locations;
create table locations(
       id int primary key auto_increment,
       name varchar(255) unique
);

# contains relations between users and locations
drop table if exists user_locations;
create table user_locations(
       id int primary key auto_increment,
      `user` int references users.id,
      `location` int references locations.id
);


# contains relations between companies and locations
drop table if exists company_locations;
create table company_locations(
       id int primary key auto_increment,
       `company` int references companies.id,
       `location` int references locations.id
);



# contains goals 
drop table if exists goals;
create table goals(
       id int primary key auto_increment,
       name varchar(255)
);

# contains relations between users and goals
drop table if exists user_goals;
create table `user_goals`(
       id int primary key auto_increment,
       `user` int references users.id,
       `goal` int references goals.id
);

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
);

# contains relations between users and contacts
drop table if exists user_contacts;
create table user_contacts(
       id int primary key auto_increment,
       `user` int references users.id,
       contact int references contacts.id
);

# contains relations between companies and contacts
drop table if exists company_contacts;
create table company_contacts(
       id int primary key auto_increment,
       `company` int references companies.id,
       contact int references contacts.id
);


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
);

# contains relations between users and schedules
drop table if exists user_schedule;
create table user_schedule(
       id int primary key auto_increment,
      `user` int references users.id,
      `schedule` int references schedule.id
);



