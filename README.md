# OpenShift Serverless Workshop - Code
This repo contains the source code used in a workshop on OpenShift Serverless (Knative). It is organized as a set of subfolders. Each subfolder containing a microservice, some code functions, scripts, etc. We try to follow a file naming convention or provide a comment header so that it's clear which lab the code corresponds with.

For reference the workshop labs using this code [can be found here](https://github.com/RedHatGov/serverless-workshop-labguides/).

## Setup

### Modernize an Application with Serverless

TODO

### Feature Innovation with Serverless

Prerequisites:

1. Deploy OCS Operator

2. Create storage cluster

3. Create object volume claim for each user project

Set the number of users:
```bash
export NUM_USERS=5  # replace me
```

For each user, create a user project:

```bash
for (( i=1 ; i<=$NUM_USERS ; i++ ))
do
  oc new-project user$i --as=user$i \
    --as-group=system:authenticated --as-group=system:authenticated:oauth
done
```

For each user, create an object volume claim:

```bash
for (( i=1 ; i<=$NUM_USERS ; i++ ))
do
  oc create -n user$i -f ./setup/obc.yaml
done
```

4. Upload model for each user project

