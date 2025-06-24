CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_id` text NOT NULL,
	`name` text NOT NULL,
	`required_lessons` integer NOT NULL,
	`order` integer NOT NULL,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `day_of_weeks` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`order` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lesson_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`subject_id` text NOT NULL,
	`course_id` text,
	`time_schedule_slot_id` text,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`time_schedule_slot_id`) REFERENCES `time_schedule_slots`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`total_required_lessons` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `time_schedule_slots` (
	`id` text PRIMARY KEY NOT NULL,
	`weekly_schedule_id` text NOT NULL,
	`day_of_week_id` integer NOT NULL,
	`period` integer NOT NULL,
	`subject_id` text NOT NULL,
	FOREIGN KEY (`weekly_schedule_id`) REFERENCES `weekly_schedules`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`day_of_week_id`) REFERENCES `day_of_weeks`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `weekly_schedules` (
	`id` text PRIMARY KEY NOT NULL,
	`year` text NOT NULL,
	`label` text
);
