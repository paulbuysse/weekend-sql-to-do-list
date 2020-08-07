--table info
CREATE TABLE task_list(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (200) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE
);

--test values
INSERT INTO "task_list"("task")
VALUES ('Get groceries');
INSERT INTO "task_list"("task")
VALUES ('Walk the dog');
INSERT INTO "task_list"("task")
VALUES ('Clean the kitchen');
INSERT INTO "task_list"("task")
VALUES ('Do homework');
INSERT INTO "task_list"("task")
VALUES ('Email instructor about assignment');