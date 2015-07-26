
drop table if exists notes_location_user;

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
