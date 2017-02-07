# Hasher
Simple client-side password hashing utility

# About
A complete client-side SHA256 password hashing utility with basic salting. No servers are involved in this application and your passwords or hashes will never be sent out to any servers. They will always stay on your computer. In fact, you can even run this page without any internet connection! You can also download this page on your computer and it will work!

This application is useful for securing various online accounts where their password handling policies may be insecure or non-existent. You just type the desired password for your account password, then click on the Hash! button to get the hashed password and you use that hash digest as a password that you use to log into your online account.

Note: It is advisable to use the password salting as it may make your password hash more resistant to a rainbow table attack.

# Implementation
Hasher uses jsSHA2, the JavaScript implementation of SHA256. View the un-minified version of JavaScript code through here.

This page runs on inline minified JavaScript code combined with sha256.js. To view the un-minified JavaScript code, click here. This page uses a heavily stripped-down version of Twitter's Bootstrap V3 to reduce the page size and improve the page loading speed. The size of this page is only 20 KB!
