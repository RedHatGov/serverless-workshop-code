# NLP model

## Setup

Fork this repo.

Download the dataset from https://www.kaggle.com/vbmokin/nlp-with-disaster-tweets-cleaning-data.  Save the dataset as `train.csv` in the `training` folder.

Use the aws CLI and run `aws configure` to create config and credential files in your home directory.

Replace the bucket name in the `train.py` and `prediction.py` files with your S3 bucket.

## Train the model

Run the training script.  The model is uploaded to your S3 bucket.
```
python train.py
```

## Option A: Run model prediction using OpenShift Serverless

TODO

## Option B: Run model prediction using s2i

Run the prediction service using s2i.

```
GITHUB_URL=<fork-repo-url>
oc new-app python:2.7~$GITHUB_URL --name prediction --context-dir=model/prediction
oc create configmap config --from-file=$HOME/.aws/config
oc create secret generic credentials --from-file=$HOME/.aws/credentials
oc set volume dc prediction --add --name=config --mount-path /opt/app-root/src/.aws/config --sub-path=config --source='{"configMap":{"name":"config"}}'
oc set volume dc prediction --add --name=credentials --mount-path /opt/app-root/src/.aws/credentials --sub-path=credentials --source='{"secret":{"secretName":"credentials"}}'
```

Send sample requests.

```
oc expose svc prediction
PREDICTION_URL=$(oc get route prediction --template='{{.spec.host}}/predict')
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "nothing to see here"}' $PREDICTION_URL
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "massive flooding and thunderstorms taking place"}' $PREDICTION_URL
```

## Option C: Run model prediction locally

Run the prediction service using flask.

```
export FLASK_APP=prediction.py
flask run
```

Send sample requests.

```
PREDICTION_URL='http://localhost:5000/predict'
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "nothing to see here"}' PREDICTION_URL
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "massive flooding and thunderstorms taking place"}' PREDICTION_URL
```
