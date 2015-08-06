/*
	gregsList is a database driven web app to help direct a job hunt.
*/

# drop tables with foreign keys first

drop table if exists company_industry;
drop table if exists postings;
drop table if exists user_schedule;
drop table if exists company_contacts;
drop table if exists user_contacts;
drop table if exists user_goals;
drop table if exists user_industries;
drop table if exists company_locations;
drop table if exists user_locations;
drop table if exists `user_companies`;
drop table if exists `pass`;
drop table if exists `users`;
drop table if exists industries;

# update 2015-06-30
drop table if exists notes_goal_user;
drop table if exists notes_industry_user;
drop table if exists notes_company_user;
drop table if exists notes_location_user;
drop table if exists notes_posting_user;
drop table if exists notes_contact_user;
drop table if exists notes_event_user;
drop table if exists notes_user;

# update 2015-07-08
drop table if exists user_schedule_notes;

# update 2015-07-21
drop table if exists notes_location_user;


# table to contain users of gregsList
create table `users`(
       id int primary key unique auto_increment,
       name varchar(255) not null,
       unique key name (name) 
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
       name varchar(255),
       unique key name (name) 
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
	      ("Infinera"),
	      ("if(we), formally known as Tagged Inc"),
	      ("Epsilon"),
	      ("Monsanto");


# contains relations between users and companies
create table user_companies(
       id int primary key unique auto_increment,
       `user` int, # references users.id,
       company int, # references companies.id
       motivation int,
       # need to add unique key here somehow.
       unique key combo (`user`, `company`),
       foreign key (`user`) references users(id)
       	       on delete set null on update cascade,
       foreign key (`company`) references companies(id)
       	       on delete set null on update cascade
)engine=innodb;




# add some base case user_companies

# the base case example is that the companies.name already exists in
# the companies table. 

insert into `user_companies` (`user`,company,`motivation`)
       values ( # example where the company name is already defined
		(select id from `users` where users.name="greg"),
		(select id from `companies` where companies.name="Google"),
		5
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="NASA"),
		 5
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="US Dept of Energy"),
		 5
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="Berkshire Hathaway"),
		 4
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="United Airlines"),
		 2		 
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="Intel"),
		 3
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="Qualcomm"),
		 3
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="NVIDIA"),
		 4
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="General Motors"),
		 3
		),
		( # example where the company name is already defined
		 (select id from `users` where users.name="greg"),
		 (select id from `companies` where companies.name="The Carney Group"),
		 1
		),

		# next user

       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Disney"),
		4
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Coca Cola"),
		3
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Oregon State University"),
		3
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="United Airlines"),
		2
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Amazon"),
		2
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Berkshire Hathaway"),
		3
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Wikipedia"),
		4
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Facebook"),
		4
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Twitter"),
		4
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Walmart"),
		2
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Intel"),
		3
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="NSA"),
		3
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Proctor & Gamble"),
		3
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Yahoo"),
		5
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="US Dept of Energy"),
		4
		),
       	      ( # example where the company name is already defined
		(select id from `users` where users.name="mitchell"),
		(select id from `companies` where companies.name="Marvel Studios"),
		5
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

# base cases for posting dependencies
insert into locations (name)
       values
	("Bethlehem, PA"),
	("US-PA-Breinigsville"),
	("Allentown, PA"),
	("San Francisco, CA");





# contains relations between users and locations
create table user_locations(
       id int primary key auto_increment,
      `user` int, # references users.id,
      `location` int, # references locations.id
      `motivation` int, #
       unique key combo (`user`, `location`),
      foreign key (`user`) references users(id)
      		  on delete set null on update cascade,
      foreign key (`location`) references locations(id)
      	      	  on delete set null on update cascade
)engine=innodb;


# user_location base cases
insert into user_locations (`user`,`location`,`motivation`) 
 values (1,1,3),(1,2,3),(1,3,2),(2,3,4),(2,1,3),(2,2,2);




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

# base jobBoards
create table jobBoards(
       id int primary key unique auto_increment,
       name varchar(255),
       unique key uniqueName (name)
)engine=innodb;


# add base cases for jobBoards

insert into jobBoards (name)
 values ("http://indeed.com"),
 ("http://careerbuilder.com"),
 ("http://monster.com"),
 ("http://linkedin.com"),
 ("http://glassdoor.com");

# contains job postings
create table postings(
       id int primary key unique auto_increment,
       title varchar(255),
       `url` varchar(255),
       `company` int, # references companies.id,
       `location` int, # references locations.id
       `source` int,
       unique key uniqueURL (`url`),
       foreign key (`company`) references companies(id)
      		  on delete set null on update cascade,
       foreign key (`location`) references locations(id)
      		  on delete set null on update cascade,
       foreign key (`source`) references jobBoards(id)
      		  on delete set null on update cascade       
)engine=innodb;
# notes:
# couldn't separate postings from user.  It was too complicated to
# figure out how to remove postings if they weren't tied to a user id.
# Mon Jul 27, 2015 12:16:36 doing it now months later... grr...

# base cases
insert into `postings` (`title`,`url`,`company`,`location`,`source`)
       values
       ( #1
       "Software Engineer / Application Developer", # title
       "http://www.indeed.com/cmp/The-Carney-Group/jobs/Software-Engineer-Application-Developer-b67c029e9687804f", # url
       20, # companyId
       4, # location
       1 # jobBoard
       );

insert into `postings` (`title`,`url`,`company`,`location`,`source`)
       values
       ( #2
       "IT Support Engineer II", #title
       "https://us-amazon.icims.com/jobs/309767/it-support-engineer-ii/job?mode=job&iis=Indeed&iisn=Indeed+%28Free+Posting%29&mobile=false&width=1455&height=1200&bga=true&needsRedirect=false&jan1offset=-420&jun1offset=-420", # url
       19, # companyId
       5, # locationId
       1 # jobBoardId
       );

insert into `postings` (`title`,`url`,`company`,`location`,`source`)
       values
       ( #3
       "Computer Engineer", #title
       "http://www.infinera.com/career/ourjobs.html?nl=1&jvi=oxTv0fwF,Job&jvs=Indeed&jvk=Job", # url
       26, # companyId
       6, # locationId
       1 # jobBoardId
       );

insert into `postings` (`title`,`url`,`company`,`location`,`source`)
       values
       ( #4
       "Summer 2015 Intern - Software Engineer", # title
       "http://www.indeed.com/viewjob?jk=42c7d94ab47fda67&q=intern+computer+science&l=san+francisco&tk=19ge8en191d3i0qb&from=web&advn=641811570115501&sjdu=ME_qcF1gz2XOe_-MpbFh208rDrQtJktyve_qLEqEOHE&pub=pub-indeed", # url
       27, # companyId
       7, # locationId
       1 # jobBoardId
       );

insert into `postings` (`title`,`url`,`company`,`location`,`source`)
       values
       ( #5
       "Software Engineer Intern-Computer Vision and Machine Learning", # title
       "https://alliancedata.taleo.net/careersection/epsilon/jobdetail.ftl?job=85205&src=JB-10160", # url
       28, # companyId
       7, # locationId
       1 # jobBoardId
       );



create table user_postings(
       id int primary key unique auto_increment,
       `user` int,
       `posting` int,
       `status` int,  # 1 = applied, 0 = not applied?
       `motivation` int,	       
       unique key uniqueUserPostings (`user`, `posting`), 
       foreign key (`user`) references users(id)
              on delete set null on update cascade,
       foreign key (`posting`) references postings(id)
              on delete set null on update cascade
)engine=innodb;


insert into user_postings (user,posting)
 values (1,1),(1,2),(1,3),(2,4),(2,5);



# list of industries
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
)engine=innodb;

# base case
insert into user_schedule (`user`,`schedule`)
       values (1,1), (1,2),
       	      (2,1), (2,2);
       
	

drop table if exists notes;
create table `notes` (
       id int primary key unique auto_increment,
       title varchar(255),
       `text` text
)engine=innodb;


create table notes_goal_user (
       id int primary key unique auto_increment,
       `goal` int,
       `note` int,
       `user` int,
       foreign key (`user`) references users(id)
      		  on delete set null on update cascade,
       foreign key (`goal`) references goals(id)
      		  on delete set null on update cascade,
       foreign key (`note`) references `notes`(id)
       	       on delete set null on update cascade
)engine=innodb;



create table notes_industry_user (
       id int primary key unique auto_increment,
       `note` int,
       industry int,
       user int,
       foreign key (`note`) references `notes`(id)
       	       on delete set null on update cascade,
       foreign key (industry) references industries(id)
       	       on delete set null on update cascade,
       foreign key (user) references users(id)
       	       on delete set null on update cascade
)engine=innodb;




create table notes_company_user (
       id int primary key unique auto_increment,
       `note` int,
       company int,
       user int,
       foreign key (`note`) references `notes`(id)
       	       on delete set null on update cascade,
       foreign key (company) references companies(id)
       	       on delete set null on update cascade,
       foreign key (user) references users(id)
       	       on delete set null on update cascade
)engine=innodb;



create table notes_posting_user (
       id int primary key unique auto_increment,
       `note` int,
       posting int,
       user int,
       foreign key (`note`) references `notes`(id)
       	       on delete set null on update cascade,
       foreign key (posting) references postings(id)
       	       on delete set null on update cascade,
       foreign key (user) references users(id)
       	       on delete set null on update cascade
)engine=innodb;


# This table should aggregate all user notes eventually.
create table notes_user (
       id int primary key unique auto_increment,
       `note` int,
       user int,
       foreign key (`note`) references `notes`(id)
       	       on delete set null on update cascade,
       foreign key (user) references users(id)
       	       on delete set null on update cascade
)engine=innodb;




create table user_schedule_notes (
	id int primary key unique auto_increment,
	`user_schedule_id` int,
	`notes_user_id` int,
	foreign key (`user_schedule_id`) references user_schedule(id)
		on delete set null on update cascade,
	foreign key (`notes_user_id`) references notes_user(id)
		on delete set null on update cascade
)engine=innodb;      



create table notes_location_user (
	id int primary key unique auto_increment,
	`note` int,
	`location` int,
	`user` int,
	foreign key (`note`) references notes(id)
		on delete set null on update cascade,
	foreign key (`location`) references locations(id)
		on delete set null on update cascade,
       foreign key (user) references users(id)
       	       on delete set null on update cascade

)engine=innodb;      


# Need to add sections for resumes and cover letters here.

create table cover_letters(
	id int primary key unique auto_increment,
	`user` int,
	title varchar(255),
	`text` text
)engine=innodb;


# base case insertion tests?   Really want to do this in javascript or at least PHP.

insert into cover_letters(`user`,title, `text`) values
       (1, "sample-cover-letter-00",
"
Dear HR Staff,
Your advertisement on the New York Times website on February 27, 2014, for an Assess-
ment Coordinator seems to perfectly match my background and experience. As the Inter-
national Brand Coordinator for Kahlúa, I coordinated meetings, prepared presentations
58    K nock ’em Dead

and materials, organized a major offsite conference, and supervised an assistant. I believe
that I am an excellent candidate for this position, as I have illustrated below:


YOUR REQUIREMENTS                          MY QUALIFICATIONS

Highly motivated and diplomatic.           Successfully managed project teams involving
                                           different flexible, quality-driven professional
                                           business units. The defined end results were
                                           achieved on every project.

Exceptional organizational skills and      Planned the development and launch of the
attention to detail.                       Kahlúa Heritage Edition bottle series. My for-
                                           mer manager enjoyed leaving the details and
                                           follow-through to me. Coverdale project man-
                                           agement training.

College degree and six years of            B.A. from Vassar College (2002). 6+ years’ rel-
experience.                                evant business experience in productive, pro-
                                           fessional environments.

Computer literacy.                         Extensive knowledge of Windows and Macin-
                                           tosh applications.


I’m interested in this position because it fits well with my new career focus in the human
resources field. Currently, I am enrolled in NYU’s adult career planning and development
certificate program, and am working at Lee Hecht Harrison.
    My resume, pasted below and attached in MSWord, will provide more information on
my strengths and career achievements. If after reviewing my material you believe that there
is a match, please call me. Thank you for your consideration.
    Sincere regards,
    Jane Swift
");



create table resumes(
	id int primary key unique auto_increment,
	`user` int,
	title varchar(255),
	`text` text
)engine=innodb;


insert into resumes(`user`,title,`text`)
       values (1,
       	       "sample-resume-1",
	       "
Name
Mailing address (if appropriate) • Telephone & cell phone • E-mail address


Professional Target Job Title
----------------------------
This helps database visibility and tells people what they will be reading.

Performance Profile / Career Summary
------------------------------------
No more than five lines of unbroken text, perhaps followed by a second similar paragraph or
short list of bullet points. The idea is to capture your ability to do the target job. What goes in
here? Take the most common requirements from your TJD exercise Step Three and rewrite
them as your performance profile. (For more on this, see the Competitive Difference Question-
naire on the Knock ’em Dead website.) This will help your resume’s database visibility and will
immediately resonate with the recruiter. Always note bilingual skills, since we live in a global
economy.

Core Competencies (Professional Skills and Skill Prioritization)
-------------------
Specific and detailed. This is the bulleted list of keywords that you identified in Step Three of
the TJD. It can be as long as you like. This list gives the reader an immediate focus (“Oh, she
can talk about this and this”), and each word can be repeated in the context of the job to which
it applied. Some of your keywords can be written in two or more ways; for example, a recruiter
might use “Profit and Loss” responsibilities or “P & L,” and you have no way of knowing which.
The solution is to use one variation in your Professional Skills/Core Competencies section, and
the other within the context of the jobs where you used them.
    Your professional skills are most readily accessible when they appear in three or four col-
umns. This section contains a list of your important professional skills and so needs to be near
the top of your resume, for the following reasons:

1.	 Coming after a Target Job Title and a Performance Summary that focuses on the skills you
    bring to the target job, skills reflect employer priorities. With accurate prioritization, you help
    both the discoverability of your resume and its impact with knowledgeable readers.
2.	 The ATS programs that recruiters use to search resume databases in turn use algorithms
    that reward relevant words near the top of a document as a means of judging that docu-
    ment’s relevance to the recruiters’ search terms. This means your professional skills need to
    be relevant to the target job and appear near the top of your resume. I have been suggest-
    ing this for years—perhaps because I have been using ATS since 1987, when it first came
    on the scene, and have an understanding of how it works.
3.	 A recent study showed that once a resume has been pulled from a resume database, recruit-
    ers spend an average of six seconds on a first-time scan of that resume. This means your
    qualifications have to jump out, and you achieve this by using a Target Job Title, followed
    by a Performance Summary that reflects employer priorities and a Professional Skills sec-
    tion that supports all the above claims of professional competency with a list of your relevant
    skills. This gives a recruiter plenty of time to see your abilities in that first six-second scan.
   However there is another issue at play when it comes to the Professional Skills section of
your resume. Ultimately it will be read by someone who really knows this job—knows what’s a
“must have” and what’s a “nice to have.”
52      K nock ’em Dead


      The easiest way to explain this is with an example: A couple of years back I did a resume for
 a dental assistant. She gave me a list of all the important technical skills of her job. I put these
 into three columns for visual accessibility, and when I did so, something terrible jumped out at
 me: Her list started with “Teeth whitening” and ended with “Four-handed dentistry.” What was
 so terrible about this? After all, all the skills were there . . .
      Yes, they were, but in the West we read from left to right and top to bottom, and common
 sense says that the most important skills for a job should come before the less important skills.
 I immediately switched these phrases so that “Four-handed dentistry” came first and “Teeth
 whitening” came last.
      Bear this story in mind when you are creating your own Professional Skills section: By pri-
 oritizing your skills, you are subtly telling the man or woman who will ultimately hire you that you
 have a firm grasp of the relative importance of all the necessary professional skills of your work,
 and that adds to the clear focus and power of the opening first half page of your resume. This
 shows that:
        •• You can do the job
        •• Your skills list backs up your statements of ability
        •• You understand the relevant importance of the component parts of your job
   The result is that within the first half page of your resume you have gone a long way toward
 making the short list of candidates who will be brought in for an interview.

                                     Technical Competencies
                             An optional category, depending on your needs.

                                      Professional Experience
                                       Company name and location
                                     Job title and employment dates
                             \(Repeat this format as many times as necessary.\)

                                               Education
     This may come at the front of the resume if these credentials are critical or especially relevant to
                    the Target Job description, or highlight your greatest strength.

                            Licenses / Professional Accreditations
      As with Education, this may come at the front of the resume if these credentials are critical or
          especially relevant to the Target Job description, or highlight your greatest strength.

                                Ongoing Professional Education
                           Professional Organizations / Affiliations
                       Publications / Patents / Speaking Languages
                                            Military Service
                                      Extracurricular Interests
                                   If—and only if—they relate to the job.

                               References Available on Request");
