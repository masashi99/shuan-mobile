CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_id` text NOT NULL,
	`course_name` text NOT NULL,
	`class_hours` integer NOT NULL,
	`progress` integer NOT NULL,
	`tag` text NOT NULL,
	FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_name` text NOT NULL,
	`class_hours` integer NOT NULL,
	`progress` integer NOT NULL,
	`tag` text NOT NULL
);
