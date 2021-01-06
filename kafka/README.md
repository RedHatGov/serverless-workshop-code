# Kafka

This section contains the necessary resources to be able to setup a Kafka Cluster and Topic.  The idea is that each participant would set up their own cluster and topic.

## Setup

These steps are to be performed by the admin/person giving the workshop.

1.  Install the "Red Hat Integration - AMQ Streams" Operator

2.  Create the Kafka Source
```
oc apply -f ./kafka-source.yml
```

3.  Create the Kafka Cluster
```
oc new-project kafka
oc apply -f ./kafka-cluster.yml
# wait for creation
oc wait kafka/my-cluster --for=condition=Ready --timeout=300s
```

4.  Change the default channel to use Kafka
```
oc apply -f ./kafka-channel-configmap.yml
```
