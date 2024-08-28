CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT '08c1a8e2-a5f6-4d14-8442-d5353fb77413' NOT NULL,
	"name" varchar(256),
	"email" varchar(256) NOT NULL,
	"password" varchar(256),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
CREATE TABLE IF NOT EXISTS "records" (
	"id" uuid PRIMARY KEY DEFAULT '1b501a1d-99cd-462f-8ce6-eb282c934b95' NOT NULL,
	"title" varchar(256),
	"icon" varchar(256),
	"iconColor" varchar(256),
	"userId" varchar
);
CREATE TABLE IF NOT EXISTS "iconcategories" (
	"id" uuid PRIMARY KEY DEFAULT 'c5e3ef1d-1d20-4741-92b4-3779b9a72f3f' NOT NULL,
	"amount" varchar(256),
	"category" varchar(256),
	"date" varchar(256),
	" time" varchar(256),
	"payee" varchar(256),
	"note " varchar(256),
	"status" varchar(256),
	"userId" varchar
);
