# Kafka

This section contains the necessary resources to be able to setup a Kafka Cluster and Topic.  The idea is that each participant would set up their own cluster and topic.

## Setup

These steps are to be performed by the admin/person giving the workshop.

1.  Install the "Red Hat Integration - AMQ Streams" Operator
2.  Create the Kafka Source
```
oc apply -f https://raw.githubusercontent.com/RedHatGov/serverless-workshop-code/main/kafka/kafka-source.yml
```
