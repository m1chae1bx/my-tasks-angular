#!/bin/bash
# A Shell Script To Deploy The To Do App Front-end Locally 
# Michael Louie Boñon - 14/Mar/2021

# Serve Front-end (Angular)
cd "$(dirname "$0")"
echo $PWD
echo "Executing... ng serve --port 4200"
ng serve --port 4200