#!/bin/sh

# LOADING FILES
curl -o ./dump/allCountries.zip 'http://download.geonames.org/export/dump/allCountries.zip'
curl -o ./dump/alternateNames.zip 'http://download.geonames.org/export/dump/alternateNames.zip'

# UNZIPPING
unzip ./dump/allCountries.zip -d dump
unzip ./dump/alternateNames.zip -d dump

# CLEANUP
rm -rf ./dump/allCountries.zip
rm -rf ./dump/alternateNames.zip
