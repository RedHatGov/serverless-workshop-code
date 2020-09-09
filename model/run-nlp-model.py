import pickle
from flask import Flask, request, abort

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':

        # Load the request text
        if not request.json or not 'text' in request.json:
            abort(400)
        text = request.json['text']

        # Load the vectorizer and model
        with open('model.pkl', 'rb') as f:
            cv, clf = pickle.load(f)

        # Return prediction
        prediction = clf.predict(cv.transform([text]))[0]      # Do not use .fit_transform() here
        if prediction == 1:
            return "This is a disaster"
        else:
            return "This is not a disaster"
