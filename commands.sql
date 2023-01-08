CREATE TABLE blogs (
	id SERIAL,
	author varchar(255),
	url varchar(255) NOT NULL,
	title varchar(255) NOT NULL,
	likes int DEFAULT 0
);

INSERT INTO blogs (author,url,title)
VALUES
	(
		'Leo',
		'yle.fi',
		'Ensimmäinen blogi'
	),
	(
		'Toto',
		'reddit.com',
		'Bebes first blogpost'
	);
