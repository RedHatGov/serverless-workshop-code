import pickle, boto3
from flask import Flask, request, abort

bucket_name = 'serverless-workshop-model'
model_file_name = 'model.pkl'
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':

        # Load the request text
        if not request.json or not 'text' in request.json:
            abort(400)
        text = request.json['text']

        # Load the vectorizer and model from S3
        s3 = boto3.resource('s3')
        s3.Bucket(bucket_name).download_file(model_file_name, model_file_name)
        with open(model_file_name, 'rb') as f:
            cv, clf = pickle.load(f)

        # Return prediction
        prediction = clf.predict(cv.transform([text]))[0]      # Do not use .fit_transform() here
        return 'Disaster' if prediction == 1 else 'No disaster'