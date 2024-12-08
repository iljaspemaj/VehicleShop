const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        if (req.url === "/submit-form.js") {
            let body = "";

            req.on("data", (chunk)=> {
                body += chunk;
            });
            
         req.on("end", () => {
            try{
            const formData = new URLSearchParams(body);
            const email = formData.get("email");
            const name = formData.get("name");
            const surname = formData.get("surname");
            const message = formData.get("message");

            console.log("Received form data:", { email, name, surname, message });
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Form submitted successfully!");
        } catch (error) {
                console.error("Error parsing form data:", error);
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Invalid form data!");
            }
         });
         
         return;
        }
    } else{
        let filePath = "_" + req.url;
        if (filePath === "./") {
            filePath = "./index.html";
        }
        const extname = path.extname(filePath);
        let contentType = "text/html";

        switch (extname) {
            case ".css":
                contentType = "text/css";
                break;
            case ".js":
                contentType = "application/javascript";
                break;
            case ".jpg":
            case ".jpeg":
                contentType = "image/jpeg";
                break;
            case ".png":
                contentType = "image/png";
                break;
            case ".json":
                contentType = "application/json";
                break;
            case ".ico":
                contentType = "image/x-icon";
                break;
            
        }

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === "ENOENT") {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.end("404 File Not Found!");
                } else {
                    console.error("Server error:", error);
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("500 Internal Server Error");
                }
            } else {
                res.writeHead(200, { "Content-Type": contentType });
                res.end(content, "utf-8");
            }
        });
    }
});

const port = 8080;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);  // Server started message.  This will be displayed in the console when the server is running.  It's useful for debugging and monitoring.  This line will not be logged in the terminal.  The terminal only displays the error messages.  The terminal will show the message: Server is running on port 8080.  This message is displayed in the terminal.  The terminal only displays the error messages.  The terminal will show the message: Server is running on port 8080.  This message is displayed in the terminal.  The terminal only displays the error messages.  The terminal will show the message: Server is running on port 8080.  This message is displayed in the terminal.  The terminal only displays the error messages.  The terminal will show the message: Server is running on port 8080.  This message is displayed in the
    
});