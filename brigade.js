const { events } = require("brigadier");

events.on("resource_added", handle);
events.on("resource_modified", handle);
events.on("resource_deleted", handle);
events.on("resource_error", handle);

function handle(e, p) {
    console.log("buck-porter is running")
    let obj = JSON.parse(e.payload);
    console.log(obj);
}