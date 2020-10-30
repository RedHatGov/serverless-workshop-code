# Smoke Tests
## Test event delivery with the default broker (in mem)
* Let's create a `Service` to be a get events (a sink) and a `PingSource` to send events every 2 min (source)
* Now let's make a `Trigger` to connect our source to our sink
* See events in the logs: `oc logs $(oc get pod -o name | grep event-display) -c user-container`

(note: the `Trigger` sets `knative-eventing-injection: enabled` which auto-creates a `Broker` for us using the default config)

Read more details here:
https://docs.openshift.com/container-platform/4.6/serverless/event_workflows/serverless-using-brokers.html

