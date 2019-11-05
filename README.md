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

```