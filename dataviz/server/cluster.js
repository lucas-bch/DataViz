

// Connect to the cluster with a MongoDB URL. Better if it's a replica set
var connectOptions = {
  // Value of 0 to 1, mentioning which portion of requestes to process here or proxy
  // If 1, all the requests allocated to this host will get processed
  // If 0.5 half of the requsted allocated to this host will get processed, others will get proxied
  // If 0, only do proxying
  selfWeight: 1 // optional
};

Cluster.connect("mongodb://localhost", connectOptions)


Cluster.register("serviceName");

// Discover a DDP connection
// > This is available on both the client and the server
Cluster.discoverConnection("serviceName");
