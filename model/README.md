# NLP model

1. Download the dataset from https://www.kaggle.com/vbmokin/nlp-with-disaster-tweets-cleaning-data

2. Train the model.  Model is uploaded to S3 bucket.  You can change the bucket name in the code.
```
python train.py
```

3. Run the prediction service using flask.  You can change the bucket name in the code.

To run this in OpenShift:
```
oc new-app python:2.7~https://github.com/RedHatGov/serverless-workshop-code --name prediction --context-dir=model/prediction
```

To run this locally:
```
export FLASK_APP=prediction.py
flask run
```

5. Sample requests

To test in OpenShift:
```
oc expose svc prediction
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "nothing to see here"}' $(oc get route prediction --template='{{.spec.host}}/predict')
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "massive flooding and thunderstorms taking place"}' $(oc get route prediction --template='{{.spec.host}}/predict')
```

To test locally:
```
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "nothing to see here"}' http://localhost:5000/predict
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "massive flooding and thunderstorms taking place"}' http://localhost:5000/predict
```
