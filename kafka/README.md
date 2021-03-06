# Kafka

This section contains the necessary resources to be able to setup a Kafka Cluster and Topic.  The idea is that each participant would use a shared cluster and set up their own topic.

## Setup

These steps are to be performed by the admin/person giving the workshop.

1.  Install the "Red Hat Integration - AMQ Streams" Operator

2.  Create the Kafka Cluster
```
oc new-project kafka
oc apply -f ./kafka-cluster.yml
# wait for creation
oc wait kafka/my-cluster --for=condition=Ready --timeout=300s
```

3.  Create the Knative Kafka Source and Channel
```
oc apply -f ./kafka-knative.yml
```

4.  Change the default channel to use Kafka
```
oc apply -f ./kafka-channel-configmap.yml
```
