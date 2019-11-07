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
    for (var pair in o.spec.parameters) {
        args.push(`--param ${pair.name}=${pair.value}`);
    }

    let cmd = "porter version";
    switch (e.type) {
        case "resource_added":
            cmd = `porter install ${o.metadata.name} --tag ${o.spec.bundle} ${args.join(" ")}`
            break;
        case "resource_modified":
            console.log(`action ${e.type} is not currently supported`);
            break;
        case "resource_deleted":
            cmd = `porter uninstall ${o.metadata.name} --tag ${o.spec.bundle}`
            break;
        default:
            console.log("no error handler registered");
            break;
    }

    let porter = new Job("porter-run", "technosophos/porter:latest");
    porter.tasks = [
        "dockerd-entrypoint.sh &",
        "sleep 20",
        cmd
    ];
    porter.privileged = true;
    porter.timeout = 1800000; // Assume some bundles will take a long time
    porter.cache = {
        enabled: true,
        size: "20Mi",
        path: "/root/.porter/claims"
    }

    return porter.run();
}