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

```console
$ brig project create
? VCS or no-VCS project? VCS
? Project Name technosophos/buck-cnab
? Full repository name github.com/technosophos/buck-cnab
? Clone URL (https://github.com/your/repo.git) https://github.com/technosophos/buck-cnab.git
? Add secrets? No
? Where should the project's shared secret come from? Auto-generate one now
Auto-generated a Shared Secret: "XXXXXXXXXXXXXXXXX"
? Configure GitHub Access? No
? Configure advanced options No
Project ID: brigade-XXXXXXXXX
```

Take note of your newly generated project ID: `Project ID: brigade-XXXXXXXXX`. You will use that in the next step.

### Step 2: Install the Buck controller

The easiest way to do this is to install the Buck chart with the `values.yaml` defined here:

```console
$ helm install buck-porter $BUCK/charts/buck -f values.yaml --set project=$PROJECT_ID
```

`$PROJECT_ID` is the project ID that Brigade created for you in Step 1.

### Step 3: Run a CNAB install

The next step is to create a `Release` object that defines what we want to install:

```yaml
```
(See examples/hello-install.yaml)

We can install this with `kubectl`:

```console
$ kubectl create -f examples/hello-install.yaml
```

A second or two after this is created, we should be able to see the Brigade build kick off with `brig build list` or with Kashti.

## Step-by-step Install

Install Brigade:

```console
$ helm install brigade brigade/brigade
NAME: brigade
LAST DEPLOYED: Thu Nov  7 16:49:22 2019
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Brigade is now installed!

To find out about your newly configured system, run:

  $ helm status brigade

NOTE: The Helm repo URL serving this chart has changed to: https://brigadecore.github.io/charts

All subsequent chart releases will be served at this URL.

Please update your local Helm repo:

  helm repo remove brigade
  helm repo add brigade https://brigadecore.github.io/charts
```

Then create the project:

```
$ brig project create
? VCS or no-VCS project? VCS
? Project Name technosophos/buck-cnab
? Full repository name github.com/technosophos/buck-cnab
? Clone URL (https://github.com/your/repo.git) https://github.com/technosophos/buck-cnab.git
? Add secrets? No
? Where should the project's shared secret come from? Auto-generate one now
Auto-generated a Shared Secret: "XXXXXXXXXXXXXXXXX"
? Configure GitHub Access? No
? Configure advanced options No
Project ID: brigade-XXXXXXXXX
$ export PROJECT=brigade-XXXXXXXXX
```

Then install Buck, pointing to the project you just created:

```console
$helm install buck-cnab ../Rust/buck/charts/buck -f values.yaml --set project=$PROJECT
NAME: buck-cnab
LAST DEPLOYED: Thu Nov  7 16:50:01 2019
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
This creates a custom controller for your CRD.

The controller will listen for the resource type cnab.technosophos.com/v1.Release.

Each time a CRD of that type is created, modified, or deleted, a new request will be sent to the Brigade project brigade-aea88cfd4231bc98fff08a51a6dad9256eb0f684fa3e9f0556a5a3
```

Now you should be able to kick of a new operation:

```console
$ kubectl create -f examples/cowsay.yaml
```

## More Information

- The `brigade.js` file is the Kubernetes controller
- The `Dockerfile` in this directory builds a Porter docker image
- The `values.yaml` file is the default set of values to pass to `helm install`. Feel free to edit
- The `bundle/` directory has the tools necessary to build a nice Cowsay bundle from the Cowsay mixin
- The `examples/` directory has examples the `Release` custom resource

Other places you will want to go:

- [Brigade](https://brigade.sh)
- The [BUCK](https://github.com/brigadecore/buck) Brigade gateway
- [Porter](https://porter.sh)
- The [Porter Cowsay mixin](https://github.com/deislabs/porter-cowsay)
