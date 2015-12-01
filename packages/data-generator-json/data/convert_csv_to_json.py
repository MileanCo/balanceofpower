
import csv, os.path
import json, sys, os
#import psycopg2
#from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT



# FILES & PATHS
INPUT_FILE = os.path.join("csv", "master.csv")
FIXTURES = os.path.join("json")
JSON_FILE = os.path.join(FIXTURES, "master.json")



# Create Datbase
def createDB():
    con = None
    #try:
        #con = psycopg2.connect(database='postgres', user=DBUSER, password=DBPWD)
        #cur = con.cursor()
        # Not sure
        #con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        # create DB
        #cur = con.cursor()
        #cur.execute('CREATE DATABASE ' + DBNAME)
    #except psycopg2.DatabaseError, e:
    #    print 'Error %s' % e
    #finally:
    #    if con:
    #        con.close()


def convert_csv(csv_file_name):
    # open files
    csv_file = open (csv_file_name, "r")
    json_file = open( JSON_FILE, "w")

    reader = csv.reader(csv_file)
    header = reader.next()
    rows = list(reader)

    records = []
    num=0

    json_file.write("[\t\n")
    for row in rows:

        ##############################################
        # Fields/columns of Record
        ##############################################
        row_fields = {
            header[ 0] : row[0] , # meet_name
            header[ 1] : row[1] , # meet_name
            header[ 2] : row[2] , # meet_name
            header[ 3] : row[3] , # meet_name
            header[ 4] : row[4] , # meet_name
            header[ 5] : row[5] , # meet_name
        }

        records.append(row_fields)

        # Write row to file
        json_file.write ("\n\t" + json.dumps(row_fields))
        # If not last item, add comma
        if (num < len(rows)-1):
            json_file.write(",")

        print row
        print "\n"
        num += 1

    json_file.write("\n]")

    # close files
    json_file.close()
    csv_file.close()

    print "Number records: " + str(len(records))




def main():
    #createDB()
    convert_csv(INPUT_FILE)

    # load data into DB
    #os.system("python manage.py loaddata " + JSON_FILE)
    #os.system("python manage.py loaddata " + TEAMS_JSON_FILE)



main()
