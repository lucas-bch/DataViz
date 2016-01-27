These instances of mongo are already configured to work in the "sysdist"
replicaSet.

Don't forget that this Vagrantfile creates THREE VMs. Maybe what you want is to
create only one in each physical maching, edit the file accordingly.

When deploying, pay attention to the hostnames. In each machine, edit
/etc/hosts to add each VM's IP to the list of known hosts.

Also, in one of them, run `$ mongo` and:

```js
$ rs.initiate()
$ rs.add("host2")
$ ...
$ rs.add("hostN")
```

The hosts will be added and the replicaSet will configurate itself, choosing
a Primary. It can take some time.

Results of the configuration can be checked with rs.status() and rs.conf()
