# URL Shortener
A short url application is used to created short links, aliases against a long url. 
They are generally used to share long urls over text messages and tweets. 

## Features 
1. User should be able to create short links, by supplying a long-url.
2. Whenever a user clicks on a short link, it should redirect to the corresponding long-url.
3. User should be able to create customized short links, with max length of 6 characters.

## System Design (Requirements)

1. Service should be always available.
2. Short to Long URL should be fast. 
3. Service should be scalable.

## System Design (Approach)

1. Use of load balancers to reduce SPOF.
2. Use of cache system to reduce database calls.




