# OpenShift Serverless Workshop - Code
This repo contains the source code used in a workshop on OpenShift Serverless (Knative). It is organized as a set of subfolders. Each subfolder containing a microservice, some code functions, scripts, etc. We try to follow a file naming convention or provide a comment header so that it's clear which lab the code corresponds with.

For reference the workshop labs using this code [can be found here](https://github.com/RedHatGov/serverless-workshop-labguides/).

## Setup

**Note**: You must have at least a 3-node cluster to install an OCS storage cluster.

### Prerequisite

Set the number of users:

```bash
export NUM_USERS=5  # replace me
```

Create a group for the workshop:

```bash
oc adm groups new workshop
```

Add each user to the workshop group and create a user project for each user:

```bash
for (( i=1 ; i<=$NUM_USERS ; i++ ))
do
  oc adm groups add-users workshop user$i
  oc new-project user$i --as=user$i \
    --as-group=system:authenticated --as-group=system:authenticated:oauth
done
```

### Tools
The environment setup for you to perform this lab should have all the tools pre-installed already.  But if not, you can download all of the CLI tooling right from within OpenShift at `$OPENSHIFT_URL/command-line-tools`.  For example if your OpenShift cluster url looks like this:

```
https://console-openshift-console.apps.cluster-foo.example.opentlc.com
```

Then you can find the page to download these tools at
```
https://console-openshift-console.apps.cluster-foo.example.opentlc.com/command-line-tools
```

You will need:

1.  `oc`
2.  `kn`
3.  `stern`


### `kn` CLI

`kn` is a very powerful tool for being able to control knative from the command line. Verify that you have it installed by running:
```execute
kn version
```

### `stern` CLI

`stern` is a great tool to easily be able to view logs for a particular container.  Verify that you have it installed by running:

```execute
stern -v
```

### Installation

1. Install Serverless Operator from OperatorHub

2. Create the `knative-serving` namespace and apply serving

```
oc new-project knative-serving
oc apply -f ./setup/serving.yml
```

3. Create the 'knative-eventing` namespace and apply eventing

```
oc new-project knative-eventing
oc apply -f ./setup/eventing.yml
```

4. Setup Kafka - Follow instructions from `./kafka/README.md`

5. Deploy CRW Operator in the operator recommended namespace (openshift-workspaces)

6. Deploy OCS Operator in the operator recommended namespace (openshift-storage)

7. Create role bindings for the workshop group (this must be run *after* kafka, CRW, and OCS are installed)

Create the following role bindings:

```bash
oc create -f ./setup/rbac.yaml
```

8. Create CRW Che Cluster

9. Create OCS storage cluster (use 3 nodes by default)

10. Create object volume claim for each user project

```bash
for (( i=1 ; i<=$NUM_USERS ; i++ ))
do
  oc create -n user$i -f ./setup/obc.yaml
done
```

11. Upload model for each user project

Set the OCS endpoint:

```
export ENDPOINT_URL=$(oc get route s3 -n openshift-storage --template='https://{{.spec.host}}')
```

```bash
for (( i=1 ; i<=$NUM_USERS ; i++ ))
do
  KEY=$(oc get secret serverless-workshop-ml -n user$i -o jsonpath="{.data.AWS_ACCESS_KEY_ID}" | base64 --decode)
  SECRET_KEY=$(oc get secret serverless-workshop-ml -n user$i -o jsonpath="{.data.AWS_SECRET_ACCESS_KEY}" | base64 --decode)
  BUCKET_NAME=$(oc get cm serverless-workshop-ml -n user$i -o jsonpath="{.data.BUCKET_NAME}")
  AWS_ACCESS_KEY_ID=$KEY AWS_SECRET_ACCESS_KEY=$SECRET_KEY aws2 --endpoint $ENDPOINT_URL \
  s3 cp ./setup/model.pkl s3://$BUCKET_NAME/model.pkl
done
```
