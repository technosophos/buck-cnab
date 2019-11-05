# Buck Porter

This is an example of using Buck and Porter together to create a Porter CRD.

## Installation

You will need:

- A Kubernetes cluster...
- ...That is running Brigade
- And you also need a `git clone` of the Buck repository
- You'll also need a `git clone` of this repository

Set `export BUCK=/path/to/buck` for convenience.

### Step 1: Add a Buck project



### Step 2: Install the Buck controller

The easiest way to do this is to install the Buck chart with the `values.yaml` defined here:

```console
$ helm install buck-porter $BUCK/charts/buck -f values.yaml --set project=$PROJECT_ID
```

`$PROJECT_ID` is the project ID that Brigade created for you in Step 1.