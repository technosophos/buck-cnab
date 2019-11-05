const { events, Job } = require("brigadier");

events.on("resource_added", handle);
events.on("resource_modified", handle);
events.on("resource_deleted", handle);
events.on("resource_error", handle);

function handle(e, p) {
    console.log("buck-porter for ${e.name}")
    let o = JSON.parse(e.payload);
    console.log(o);

    let cmd = "porter version";
    switch (o.spec.action) {
        case "install":
        case "upgrade":
        case "uninstall":
            cmd = `porter ${o.spec.action} ${o.metadata.name} --tag ${o.spec.bundle}`
            break;
        default:
            cmd = `porter invoke --action ${o.spec.action} ${o.metadata.name} --tag ${o.spec.bundle}`
    }

    let porter = new Job("porter-run", "technosophos/porter:latest");
    porter.tasks = [cmd];
    porter.privileged = true;
    porter.docker = { enabled: true };

    return porter.run();
}