**Task**
Create a simple HTTP API in Node.js with a single file upload POST route. 
The route should calculate total size (in bytes) and SHA1 hash of the file that is being uploaded. 
The size and hash should be then saved to a database and then returned to the user (uploader). 
The file itself should be discarded and not stored anywhere.

•	you can use any Node.js HTTP framework/library (Express, Koa, Fastify, pure built-in HTTP server...)
•	you can use any relational database to save the data (MySQL, PostgreSQL, SQLite...)
•	you should use async/await
•	the file should not touch the server's filesystem at all
•	file size should not matter, it should handle 1KB file as well as 100GB files

