CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT '407dbbeb-7e4b-4d92-ba37-d35ea3d59c80' NOT NULL,
	"name" varchar(256),
	"email" varchar(256) NOT NULL,
	"password" varchar(256),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
CREATE TABLE IF NOT EXISTS "records" (
	"id" uuid PRIMARY KEY DEFAULT 'b8f81b9c-6ea1-4443-8789-ae57a4627f7c' NOT NULL,
	"title" varchar(256),
	"icon" varchar(256),
	"iconColor" varchar(256),
	"userId" varchar
);
