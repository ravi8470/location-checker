# location-checker

This app has two pre-existing users, one is admin and another is user. The admin first selects a default city from a list of city. The user can then check the distance of the default city from any other city in the list.

# Tech/framework used

1. node.js
2. mongodb
3. docker

# Installation

docker and docker-compose needs to be installed.

1. clone the project
2. go to project root directory
3. run cmd - 'npm i'
4. Port 5000 should be free.
5. run cmd - 'docker-compose up'
6. Go to localhost:5000 in browser to access the app.

# How to use?

1. First login as 'admin' using credentials ravi:1234.
2. Set the default City.
3. Logout and login as 'user' role using credentials ravi:1234.
4. select any city and get its distance from the defualt city.

# Workflow

1. Initially app seeds Users for 'user' and 'admin' role.
2. We use the $geoNear aggregation stage to find the distance of a given point from the default city.