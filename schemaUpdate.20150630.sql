/*
	gregsList is a database driven web app to help direct a job hunt.
*/



drop table if exists notes_goal_user;
drop table if exists notes_industry_user;
drop table if exists notes_company_user;
drop table if exists notes_location_user;
drop table if exists notes_posting_user;
drop table if exists notes_contact_user;
drop table if exists notes_event_user;
drop table if exists notes_user;


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



# Need to add sections for resumes and cover letters here.

