drop table if exists users;
create table users(
       id int primary key unique auto_increment,
       `name` varchar(255) unique
);

insert into `users` (`name`)
       values ("greg");

drop table if exists postings;
create table postings(
       id int primary key unique auto_increment,
       title varchar(255),
       `user` int references users.id,
       sourceLink varchar(255) ,
       location int references location.id,
       industry int references industries.id
);


drop table if exists companies;
create table companies(
       id int primary key auto_increment,
       `user` int references users.id,
       name varchar(255),
       industry int references industries.id,
       hiring_activity int,
       url text
);


drop table if exists industries;
create table industries(
       id int primary key auto_increment,
       `user` int references users.id,
       name varchar(255)
);


drop table if exists location;
create table location(
       id int primary key auto_increment,
       `user` int references users.id,
       name text
);


drop table if exists goals;
create table goals(
       id int primary key auto_increment,
       `user` int references users.id,
       name varchar(255)
);


drop table if exists contacts;
create table contacts(
       id int primary key auto_increment,
       `user` int references users.id,
       company int references companies.id,
       fname varchar(255),       
       lname varchar(255),
       email varchar(255),
       phone varchar(255),
       facebook varchar(255),
       linkedin varchar(255),
       github varchar(255)
);


drop table if exists schedule;
create table schedule(
       id int primary key auto_increment,
       `user` int references users.id,
       `name` varchar(255),
       `description` text,
       `location` text,
       `contact` text,
       `url` text,
       `start` datetime,
       `end` datetime
);
