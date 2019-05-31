#!/bin/bash

# utility functions
# ***********************************
function free_port() {
    if [ -z $1 ] 
    then
        echo no Port given
    else
        PORT=$1;
        PID=$(sudo lsof -i :$PORT) # store the PID, that is using this port 

        if [ -z $PID ] 
        then
            echo port: $PORT is already free.
        else
            sudo kill -9 $PID # kill the process, which frees the port
            echo port: $PORT is now free.
        fi
    fi
}


# main method
# ***********************************
# 01. run database server
sudo service mongod start

# 02. back-end server
cd "./back end/"
free_port 8001
gnome-terminal -e "npm install" #install packages
gnome-terminal -e "node main.js" #node main.js

# 02. run media server
cd "../media"
free_port 8000
gnome-terminal -e "python -m http.server 8000"
gnome-terminal -e "python -m SimpleHTTPServer 8000"

# 02. run front-end server
cd "../front end/"
free_port 3000
gnome-terminal -e "npm install" #install packages
gnome-terminal -e "npm start"
