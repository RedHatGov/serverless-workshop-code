# NLP model

1. Download the dataset

2. Train the model.  Model is uploaded to S3 bucket.  You can change the bucket name in the code.
```
python train-nlp-model.py
```

3. Run the prediction service using flask.  You can change the bucket name in the code.
```
export FLASK_APP=run-nlp-model.py
flask run
```

5. Sample requests
```
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "nothing to see here"}' http://localhost:5000/predict
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "massive flooding and thunderstorms taking place here"}' http://localhost:5000/predict
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "a BIG fire has started to burn across Los Angeles and expected to destroy 5000 homes"}' http://localhost:5000/predict
```
