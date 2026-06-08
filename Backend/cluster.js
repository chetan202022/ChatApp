import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Starting new worker...");
    cluster.fork();
  });

} else {
  import("./index.js");
  console.log(`Worker ${process.pid} started`);
}