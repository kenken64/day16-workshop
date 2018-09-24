## Install Dep

```bash
npm i express body-parser q mysql dotenv --save
```

## SQL

1. To create schema for books table run books_schema.sql

2. Insert test data as below 

```sql
INSERT INTO books (name, author, publish_year, isbn) VALUES ('Harry Potter and the Prisoner of Azkaban', 'JK Rowling', 1996, 9780439655484) 
INSERT INTO books (name, author, publish_year, isbn) VALUES ('Harry Potter and the Philosopher\'s Stone', 'JK Rowling', 1997, 9780439554930) 
INSERT INTO books (name, author, publish_year, isbn) VALUES ('Harry Potter and the Goblet of Fire', 'JK Rowling', 1996, 9780439655485); 
INSERT INTO books (name, author, publish_year, isbn) VALUES ('Harry Potter and the Goblet of Fire 2', 'JK Rowling', 1996, 9780439655486); 
INSERT INTO books (name, author, publish_year, isbn) VALUES ('Harry Potter and the Goblet of Fire3', 'JK Rowling', 1996, 9780439655487);
INSERT INTO books (name, author, publish_year, isbn) VALUES ('Harry Potter and the Goblet of Fire4', 'JK Rowling', 1996, 9780439655488);
```

3. Verify inserted data.

```sql
SELECT * from books
```