# NLP model

## Setup

Fork this repo.

Download the dataset from https://www.kaggle.com/vbmokin/nlp-with-disaster-tweets-cleaning-data.  Save the dataset as `train.csv` in the `training` folder.

Use the aws CLI and run `aws configure` to create config and credential files in your home directory.

## Train the model

Set environment variables.

```bash
export BUCKET_NAME=serverless-workshop-model    # replace with your S3 bucket
export MODEL_FILE_NAME=model.pkl
```

Run the training script.  The model is uploaded to your S3 bucket.

```bash
cd model/training
pip install -r requirements.txt
python train.py
```

> Note: if you don't have an existing s3 bucket you can create one with `aws s3 mb s3://$BUCKET_NAME`

## Run prediction service

### Option A: Run model prediction using OpenShift Serverless

Install [OpenShift Serverless](https://docs.openshift.com/container-platform/4.5/serverless/installing_serverless/installing-openshift-serverless.html)

Install [Knative Serving](https://docs.openshift.com/container-platform/4.5/serverless/installing_serverless/installing-knative-serving.html#installing-knative-serving)

Install [Kn](https://github.com/knative/client/blob/master/docs/README.md)

Start the build

```bash
GITHUB_URL=https://github.com/RedHatGov/serverless-workshop-code    # replace with your forked repo's url
oc new-build python:2.7~$GITHUB_URL --name prediction --context-dir=model/prediction
```

Deploy to serverless using `kn`

```bash
oc create secret generic aws --from-file=$HOME/.aws
PREDICTION_IMAGE_URI=$(oc get is prediction --template='{{.status.dockerImageRepository}}')
kn service create prediction --image $PREDICTION_IMAGE_URI --mount /opt/app-root/src/.aws=aws --volume aws=sc:aws --env BUCKET_NAME=serverless-workshop-model --env MODEL_FILE_NAME=model.pkl  # replace with your S3 bucket
```

Alternatively, deploy to serverless using YAML.  Edit the `model/prediction/prediction-service.yaml` with your S3 bucket.  Then deploy

```bash
oc create configmap config --from-file=$HOME/.aws/config
oc create secret generic credentials --from-file=$HOME/.aws/credentials
PREDICTION_IMAGE_URI=$(oc get is prediction --template='{{.status.dockerImageRepository}}')
sed "s|%PREDICTION_IMAGE_URI%|$PREDICTION_IMAGE_URI|" ./model/prediction/prediction-service.yaml | oc create -f -
```

Send sample requests

```bash
PREDICTION_URL=$(oc get route.serving.knative.dev prediction --template='{{.status.url}}/predict')
curl -i -X POST -d 'Body=nothing to see here' $PREDICTION_URL
curl -i -X POST -d 'Body=massive flooding and thunderstorms taking place' $PREDICTION_URL
```

Scale test using `hey`

```bash
PREDICTION_URL=$(oc get route.serving.knative.dev prediction --template='{{.status.url}}/predict')
hey -c 100 -z 30s -m POST -H "Content-Type: application/json" -d '{"text": "nothing to see here"}' $PREDICTION_URL
```

### Option B: Run model prediction using s2i

Run the prediction service using s2i

```bash
GITHUB_URL=https://github.com/RedHatGov/serverless-workshop-code    # replace with your forked repo's url
oc new-app python:2.7~$GITHUB_URL --name prediction --context-dir=model/prediction --env BUCKET_NAME=serverless-workshop-model --env MODEL_FILE_NAME=model.pkl  # replace with your S3 bucket
oc create configmap config --from-file=$HOME/.aws/config
oc create secret generic credentials --from-file=$HOME/.aws/credentials
oc set volume deploy prediction --add --name=config --mount-path /opt/app-root/src/.aws/config --sub-path=config --source='{"configMap":{"name":"config"}}'
oc set volume deploy prediction --add --name=credentials --mount-path /opt/app-root/src/.aws/credentials --sub-path=credentials --source='{"secret":{"secretName":"credentials"}}'
```

Send sample requests

```bash
oc expose svc prediction
PREDICTION_URL=$(oc get route prediction --template='{{.spec.host}}/predict')
curl -i -X POST -d 'Body=nothing to see here' $PREDICTION_URL
curl -i -X POST -d 'Body=massive flooding and thunderstorms taking place' $PREDICTION_URL
```

### Option C: Run model prediction locally

Run the prediction service using flask

```bash
cd model/prediction
pip install -r requirements.txt
export FLASK_APP=prediction.py
export BUCKET_NAME=serverless-workshop-model    # replace with your S3 bucket
export MODEL_FILE_NAME=model.pkl
flask run
```

Send sample requests

```bash
PREDICTION_URL='http://localhost:5000/predict'
curl -i -X POST -d 'Body=nothing to see here' $PREDICTION_URL
curl -i -X POST -d 'Body=massive flooding and thunderstorms taking place' $PREDICTION_URL
```

## Integrate with Twilio

Get a [free trial account](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account) on Twilio.  You don't need a credit card to sign up.

Get a [Twilio phone number](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-first-twilio-phone-number).

Configure your [TwiML Webhook URL](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-python#configure-your-webhook-url) for your Twilio phone number.  Use the public URL endpoint of the prediction service created in either Option A or Option B.

Send a text to your Twilio phone number, and you should get a reply from the NLP prediction service!