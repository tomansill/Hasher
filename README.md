# Hasher
Simple client-side password hashing utility

# About
A complete client-side SHA256 password hashing utility with basic salting. No servers are involved in this application and your passwords or hashes will never be sent out to any servers. They will always stay on your computer. In fact, you can even run the page without any internet connection! You can also download the .html page on your computer and run it without any internet connection, it will work!

This application is useful for securing various online accounts where their password handling policies may be insecure or non-existent. You just type the desired password for your account password, then click on the Hash! button to get the hashed password and you use that hash digest as a password that you use to log into your online account.

# Implementation
Hasher uses jsSHA2, the JavaScript implementation of SHA256. http://anmar.eu.org/projects/jssha2/

This page runs on inline minified JavaScript code combined with sha256.js. This page uses a heavily stripped-down version of Twitter's Bootstrap V3 to reduce the page size and improve the page loading speed. The size of this page is only 14.4 KB!
