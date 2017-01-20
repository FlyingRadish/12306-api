create table station (
  id int auto_increment primary key,
  station_name varchar(20),
  telecode varchar(20),
  pinyin_full varchar(60),
  pinyin_short varchar(20)
);

create table train (
  trip_date varchar(20),
  train varchar(20),
  trip_from varchar(20),
  trip_to varchar(20),
  train_no varchar(60)
);
