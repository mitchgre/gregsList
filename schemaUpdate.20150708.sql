
drop table if exists user_schedule_notes;

create table user_schedule_notes (
	id int primary key unique auto_increment,
	`user_schedule_id` int,
	`notes_user_id` int,
	foreign key (`user_schedule_id`) references user_schedule.id
		on delete set null on update cascade,
	foreign key (`notes_user_id`) references notes_user.id
		on delete set null on update cascade
)engine=innodb;      
