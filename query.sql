CREATE DATABASE lifemate;
CREATE TYPE gender AS ENUM ('laki-laki', 'perempuan');
set time zone 'Asia/Jakarta'
CREATE TABLE ACCOUNT (id serial primary key, name varchar(50) not null, email varchar(50) unique not null, password varchar(60) not null, gender gender not null, birthDate DATE not null);
CREATE TABLE RECORD (id serial primary key, recorddate timestamptz not null default NOW(), height integer not null, weight integer not null, weeklytodolist integer not null, userhelp integer not null, passionate integer not null, selfreward integer not null, obesity integer not null, stress float not null);
CREATE TABLE ACCOUNTRECORD (recordid serial not null, accountid integer not null);