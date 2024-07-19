USE `travel-journal`;

ALTER TABLE travels 
ADD COLUMN rating TINYINT NOT NULL DEFAULT 5;

ALTER TABLE travels
MODIFY COLUMN description TEXT;