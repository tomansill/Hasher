# Hasher
Simple client-side password hashing utility

# Updates

## 2020-06-18
- Default Dark Mode! (Original "light mode" theme can be used if users' `prefers-color-scheme` is set to `light`)
- Fixed the issue where output value will persist when browser closes and reopens
- Changing the length of the password will now automatically change output
- The update has increased the size of the page from 14.4 KB to 17.1 KB

# About
A complete client-side SHA256 password hashing utility with basic salting. No servers are involved in this application and your passwords or hashes will never be sent out to any servers. They will always stay on your computer. In fact, you can even run the page without any internet connection! You can also download the .html page on your computer and run it without any internet connection, it will work!

This application is useful for securing various online accounts where their password handling policies may be insecure or non-existent. You just type the desired password for your account password, then click on the Hash! button to get the hashed password and you use that hash digest as a password that you use to log into your online account.

# Usage
Use the hasher.html in /inline_min in your web server or simply store it in your computer and open it with a HTML5+CSS3 and JavaScript capable browser like Google Chrome, Mozilla Firefox, or similar. JavaScript is required for this application to work.

# Implementation
Hasher uses jsSHA2, the JavaScript implementation of SHA256. http://anmar.eu.org/projects/jssha2/

This page runs on inline minified JavaScript code combined with sha256.js. This page uses a heavily stripped-down version of Twitter's Bootstrap V3 to reduce the page size and improve the page loading speed. The size of this page is only ~~14.4 KB~~ 17.1 KB!
