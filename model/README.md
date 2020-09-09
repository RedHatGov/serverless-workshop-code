# NLP model

1. Download the dataset

2. Train the model
```
python train-nlp-model.py
```

3. Model will be saved to disk as `model.pkl`

4. Run the prediction service using flask
```
flask run
```

5. Sample requests
```
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "nothing to see here"}' http://localhost:5000/predict
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "massive flooding and thunderstorms taking place here"}' http://localhost:5000/predict
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "a BIG fire has started to burn across Los Angeles and expected to destroy 5000 homes"}' http://localhost:5000/predict
```
