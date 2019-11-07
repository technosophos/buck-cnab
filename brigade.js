const { events, Job } = require("brigadier");

events.on("resource_added", handle);
events.on("resource_modified", handle);
events.on("resource_deleted", handle);
events.on("resource_error", handle);

function handle(e, p) {
    console.log(`buck-porter for ${e.type}`)
    let o = JSON.parse(e.payload);
    console.log(o);

    let args = [];
    o.spec.parameters.forEach(pair => {
        args.push(`--param ${pair.name}="${pair.value}"`);
    });

    let creds = [];
    o.spec.credentials.forEach(cred => {
        creds.push({ name: cred.name, source: { value: cred.value } })
    });
    let credentials = JSON.stringify({ credentials: creds });
    console.log(`Credentials: ${credentials}`);

    let action = "version";
    switch (e.type) {
        case "resource_added":
            action = "install";
            break;
        case "resource_modified":
            action = "upgrade";
            break;
        case "resource_deleted":
            action = "uninstall";
            break;
        default:
            console.log("no error handler registered");
            return;
    }

    let cmd = `porter ${action} ${o.metadata.name} --tag ${o.spec.bundle} --force ${args.join(" ")} -c buck`;
    let porter = new Job("porter-run", "technosophos/porter:latest");
    porter.tasks = [
        "dockerd-entrypoint.sh &",
        "sleep 20",
        "echo $CREDENTIALSET > /root/porter/credentials/buck.yaml"
            `echo ${cmd}`,
        cmd
    ];
    porter.privileged = true;
    porter.timeout = 1800000; // Assume some bundles will take a long time
    porter.cache = {
        enabled: true,
        size: "20Mi",
        path: "/root/.porter/claims"
    };
    porter.env = {
        CREDENTIALSET: credentials
    };

    //porter.storage.enabled = true;

    return porter.run();
}