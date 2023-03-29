#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "postgres" <<-EOSQL
    CREATE USER ra_user WITH ENCRYPTED PASSWORD 'ra_pass';
    CREATE DATABASE ra_db;
    GRANT ALL PRIVILEGES ON DATABASE ra_db TO ra_user;
EOSQL
