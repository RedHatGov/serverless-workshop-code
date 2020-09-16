# NLP model

## Setup

Fork this repo.

Download the dataset from https://www.kaggle.com/vbmokin/nlp-with-disaster-tweets-cleaning-data.  Save the dataset as `train.csv` in the `training` folder.

Use the aws CLI and run `aws configure` to create config and credential files in your home directory.

Replace the bucket name in the `train.py` and `prediction.py` files with your S3 bucket.

## Train the model

Run the training script.  The model is uploaded to your S3 bucket.

```bash
cd model/training
pip install -r requirements.txt
python train.py
```

## Option A: Run model prediction using OpenShift Serverless

Install [OpenShift Serverless](https://docs.openshift.com/container-platform/4.5/serverless/installing_serverless/installing-openshift-serverless.html)

Install [Knative Serving](https://docs.openshift.com/container-platform/4.5/serverless/installing_serverless/installing-knative-serving.html#installing-knative-serving)

Start the build

```bash
GITHUB_URL=https://github.com/RedHatGov/serverless-workshop-code    # replace with your forked repo's url
oc new-build python:2.7~$GITHUB_URL --name prediction --context-dir=model/prediction
```

Deploy to serverless

```bash
oc create configmap config --from-file=$HOME/.aws/config
oc create secret generic credentials --from-file=$HOME/.aws/credentials
PREDICTION_IMAGE_URI=$(oc get is prediction --template='{{.status.dockerImageRepository}}')
sed "s|%PREDICTION_IMAGE_URI%|$PREDICTION_IMAGE_URI|" ./prediction-service.yaml | oc create -f -
```

Send sample requests

```bash
PREDICTION_URL=$(oc get route.serving.knative.dev prediction --template='{{.status.url}}/predict')
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "nothing to see here"}' $PREDICTION_URL
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "massive flooding and thunderstorms taking place"}' $PREDICTION_URL
```

## Option B: Run model prediction using s2i

Run the prediction service using s2i

```bash
GITHUB_URL=https://github.com/RedHatGov/serverless-workshop-code    # replace with your forked repo's url
oc new-app python:2.7~$GITHUB_URL --name prediction --context-dir=model/prediction
oc create configmap config --from-file=$HOME/.aws/config
oc create secret generic credentials --from-file=$HOME/.aws/credentials
oc set volume dc prediction --add --name=config --mount-path /opt/app-root/src/.aws/config --sub-path=config --source='{"configMap":{"name":"config"}}'
oc set volume dc prediction --add --name=credentials --mount-path /opt/app-root/src/.aws/credentials --sub-path=credentials --source='{"secret":{"secretName":"credentials"}}'
```

Send sample requests

```bash
oc expose svc prediction
PREDICTION_URL=$(oc get route prediction --template='{{.spec.host}}/predict')
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "nothing to see here"}' $PREDICTION_URL
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "massive flooding and thunderstorms taking place"}' $PREDICTION_URL
```

## Option C: Run model prediction locally

Run the prediction service using flask

```bash
cd model/prediction
pip install -r requirements.txt
export FLASK_APP=prediction.py
flask run
```

Send sample requests

```bash
PREDICTION_URL='http://localhost:5000/predict'
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "nothing to see here"}' $PREDICTION_URL
curl -i -H "Content-Type: application/json" -X POST -d '{"text": "massive flooding and thunderstorms taking place"}' $PREDICTION_URL
```
