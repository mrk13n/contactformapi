 CREATE DATABASE IF NOT EXISTS geonames;
  USE geonames;

 CREATE TABLE IF NOT EXISTS geoname (
     geonameid int PRIMARY KEY,
     name varchar(200),
     asciiname varchar(200),
     alternatenames varchar(4000),
     latitude decimal(10,7),
     longitude decimal(10,7),
     fclass char(1),
     fcode varchar(10),
     country varchar(2),
     cc2 varchar(60),
     admin1 varchar(20),
     admin2 varchar(80),
     admin3 varchar(20),
     admin4 varchar(20),
     population int,
     elevation int,
     gtopo30 int,
     timezone varchar(40),
     moddate date
 ) CHARACTER SET utf8;

 CREATE TABLE IF NOT EXISTS alternatename (
     alternatenameId int PRIMARY KEY,
     geonameid int,
     isoLanguage varchar(7),
     alternateName varchar(200),
     isPreferredName boolean,
     isShortName boolean,
     isColloquial boolean,
     isHistoric boolean
 ) CHARACTER SET utf8;

 CREATE TABLE IF NOT EXISTS changedStates (
     admin2 varchar(80) PRIMARY KEY,
     admin1 varchar(20)
 ) CHARACTER SET utf8;

 LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/allCountries.txt' INTO TABLE geoname CHARACTER SET 'utf8mb4' (geonameid,name,asciiname,alternatenames,latitude,longitude,fclass,fcode,country,cc2, admin1,admin2,admin3,admin4,population,elevation,gtopo30,timezone,moddate);
 LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/alternateNames.txt' INTO TABLE alternatename CHARACTER SET 'utf8mb4' (alternatenameid,geonameid,isoLanguage,alternateName,isPreferredName,isShortName);

 CREATE INDEX fcode ON geoname(fcode);
 CREATE INDEX fclass ON geoname(fclass);
 CREATE INDEX fcode_fclass ON geoname(fcode, fclass);
 CREATE INDEX country ON geoname(country);
 CREATE INDEX name1 ON geoname(name);
 CREATE INDEX fcode_fclass_country ON geoname(fcode, fclass, country);
 CREATE INDEX admin1 ON geoname(admin1);
 CREATE INDEX fcode_fclass_country_admin1 ON geoname(fcode, fclass, country, admin1);
 CREATE UNIQUE INDEX geonameid ON geoname(geonameid);

 UPDATE geoname G INNER JOIN alternatename A ON G.geonameid = A.geonameid SET G.admin2 = CONCAT(G.country, G.admin1), G.admin1 = A.alternateName WHERE A.isoLanguage = 'abbr' AND G.fclass = 'A' AND G.fcode = 'ADM1';
 UPDATE geoname G SET G.admin4 = CONCAT(G.country, G.admin1) WHERE G.fclass = 'P' AND (G.fcode = 'PPL' OR G.fcode='PPLA' OR G.fcode='PPLA2');
 INSERT INTO changedStates SELECT admin2, admin1 FROM geoname WHERE fcode='ADM1' AND admin2<>'';
 UPDATE geoname G INNER JOIN changedStates S ON G.admin4 = S.admin2 SET G.admin1 = S.admin1;
