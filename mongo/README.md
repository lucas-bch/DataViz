These instances of mongo are already configured to work in the "sysdist"
replicaSet.

Don't forget that this Vagrantfile creates THREE VMs. Maybe what you want is to
create only one in each physical maching, edit the file accordingly.

When deploying, pay attention to the hostnames. In each machine, edit
/etc/hosts to add each VM's IP to the list of known hosts. If the VM is already
able to reach the other ones by their hostnames, you don't need to change this
file.

To deploy these at Ensimag, we needed to change the VM's hostnames to match the
hostnames of the machines that are running them. Also, each VM should redirect
the port where MongoDB is executing to the same port on the host machine. Each
MongoDB needs to run in a different port. In our case, we use the 2701[7-9]
ports.

To change the port where Mongo runs in the VMs, edit /etc/mongodb.conf, and
insert this line:

```
port=<port number>
```
Also, in one of the VMs, run `$ mongo` and:

```js
rs.initiate()
rs.add("host2")
...
rs.add("hostN")
```

The hosts will be added and the replicaSet will configurate itself, choosing
a Primary. It can take some time.

Results of the configuration can be checked with rs.status() and rs.conf()
