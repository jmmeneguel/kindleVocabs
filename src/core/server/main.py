from flask import Flask, Response
from flask_cors import CORS
from database_controller import Database
import requests


def get_meaning_from_api(lang, stem):
    url = 'https://api.dictionaryapi.dev/api/v2/entries/{}/{}'.format(
        lang, stem)
    res = requests.get(url)

    return res.status_code, res.text


app = Flask(__name__)
CORS(app)


@app.route('/get/<lang>/<stem>')
def insert_word(lang: str, stem: str):
    id = '{}-{}'.format(lang, stem)
    try:
        database = Database()
        _, meaning = database.select_from_table(id=id)
        status = 200
        print('{} found'.format(id))
    except ValueError:
        print("{} not found in database".format(id))
        status, meaning = get_meaning_from_api(lang, stem)
        if status == 200:
            database.insert_on_table({
                'id': id,
                'meaning': meaning
            })
        else:
            print('status', status)

    return Response(meaning, status=status, mimetype='application/json')


app.run(debug=False)
