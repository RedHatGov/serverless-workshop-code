# Cloud Event Display
Show cloud events - great for testing eventing. Adding the code here so we can tweak the source if needed.

## To Use
`oc new-app golang~https://github.com/RedHatGov/serverless-workshop-code.git --context-dir=/cloud-event-display --name=cloud-event-display`

To use from an prebuilt container image with as a KNative service just run:
`oc apply -f ../smoketests/event-display.yaml`


## Originally borrowed from here:
https://github.com/knative/eventing-contrib/tree/master/cmd/event_display
