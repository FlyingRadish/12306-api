create database 12306api;
use 12306api;
create table station (
  id int auto_increment primary key,
  name varchar(20),
  telecode varchar(20),
  pinyin_full varchar(60),
  pinyin_short varchar(20),
  update_at int unsigned
);

create table train (
  id int auto_increment primary key,
  trip_date varchar(20),
  train varchar(20),
  trip_from varchar(20),
  trip_to varchar(20),
  train_no varchar(60),
  update_at int unsigned
);
