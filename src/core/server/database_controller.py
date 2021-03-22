import sqlite3
from sqlite3 import Error
import json


class Database():
    def __init__(self):
        self.connection = self.create_connection()
        self.create_tables()

    def create_connection(self, db_file="database.db"):
        """ create a database connection to the SQLite database
            specified by the db_file
        :param db_file: database file
        :return: Connection object or None
        """
        conn = None
        try:
            conn = sqlite3.connect(db_file)
        except Error as e:
            print(e)

        return conn

    def create_tables(self):

        stmt = "CREATE TABLE IF NOT EXISTS meanings (id TEXT PRIMARY KEY, meaning TEXT NOT NULL)"

        cur = self.connection.cursor()
        cur.execute(stmt)

    def select_from_table(self, table_name='meanings', id=None):
        """
        Query all rows in the tasks table
        :param conn: the Connection object
        :return:
        """
        if id is None:
            stmt = "SELECT * FROM {}".format(table_name)
        else:
            stmt = "SELECT * FROM {} WHERE id = '{}';".format(table_name, id)

        cur = self.connection.cursor()
        cur.execute(stmt)

        rows = cur.fetchall()

        if len(rows) == 0:
            raise ValueError

        return rows[0]

    def insert_on_table(self, value, table_name='meanings'):
        stmt = "INSERT INTO {} (id, meaning) VALUES('{}', '{}');".format(table_name,
                                                                         value['id'],
                                                                         value['meaning'].replace("'", "’"))
        cur = self.connection.cursor()
        cur.execute(stmt)

        commit = self.connection.commit()
        print(commit)


if __name__ == '__main__':
    database = Database("database.db")
    meaning = database.select_from_table(id="en-thrive")
