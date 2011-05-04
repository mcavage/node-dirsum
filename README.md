node-dirsum is a super small library that gives you the node.js equivalent of:

    find <dir> -type f | xargs md5

With the added feature that this library will summarize the hashes into one
master hash so you can get a single checksum for a directory treat.  Note that
there is no 'standard' way to do this in UNIX, but you basically have two
choices:

* Pipe all the bytes of all the files into one digest
* Compute a digest of all the digests

Since (1) is hard to do if your files are large, I went with (2).  Again, this
may or may not be useful to you, since there's not a standard client to validate
this.  At a minimum, you can at least get a tree of all the files and their
checksums.

## Usage

    var dirsum = require('../lib/dirsum');

    dirsum.digest('/your/tree', 'sha1', function(err, hashes) {
      if (err) throw err;
      console.log(JSON.stringify(hashes, null, 2));
    });

There you go.  That's the whole API.  There's the equivalent of that in the
tst directory, and I copied in the openldap default files, since there's a bunch
of schema files in there.  Running that with 'md5' as the method gives this
output:

    {
      "files": {
        "ldap.conf": "a1b26e90628b18bc9cea6c9573a63b7b",
        "ldap.conf.default": "a1b26e90628b18bc9cea6c9573a63b7b",
	"schema": {
	  "files": {
	    "apple.schema": "d74ab4c3522e0154fb409c9a6515ad8f",
	    "apple_auxillary.schema": "20b1560538fe8cc73bc97b0ce8f8d7a4",
	    "collective.schema": "139aefbd0541ad2f4198ea53d2689334",
	    "corba.schema": "72684228a9d9691e458a9850f93231fb",
	    "core.ldif": "0c9d2c5df2376192e02f11bc6edc96f7",
	    "core.schema": "fdd7cfc44ca73698f877d64becdc8278",
	    "cosine.ldif": "82c062506b1dc1786c7b1bdd56c53f1a",
	    "duaconf.schema": "2503265c236a158ae5be7eb6d81b130a",
	    "dyngroup.schema": "55b65ea42cec37ad0ba110752e1c20c2",
	    "fmserver.schema": "928cb73c8f0dd0b5b18d2619a3a0dbc5",
	    "inetorgperson.ldif": "71db554a56953e03669784270f69942c",
	    "inetorgperson.schema": "7452ce52fcecad8aa97446fed52b1db2",
	    "java.schema": "8f8f12b72432388e065e37e19eca0eec",
	    "krb5-kdc.schema": "04df5507f0a3b1602efd523a42bd1f90",
	    "microsoft.std.schema": "928686833526a63590d8d56fb15f3602",
	    "misc.schema": "c2453f83012e97e84a4a2841c62cee88",
	    "nadf.schema": "687e1d49faa7c0f4990eba6899e3ba7f",
	    "netinfo.schema": "4ca7cc2b5cf43618cfbd540171f8ffd6",
	    "nis.ldif": "4322c3f16f38f802bea8fdc0a3524274",
	    "nis.schema": "fc3255f06a87dd7c360e88772b2d17de",
	    "openldap.ldif": "f342787e81ac1101cf860dea78e7bb51",
	    "openldap.schema": "bbf95ea610c9f28c4a7bdc4c867e8961",
	    "ppolicy.schema": "8fbc0dda95c831a9ed84b2884c56a02b",
	    "README": "dfe2414dc543da3fdf98b48ab3de1a94",
	    "samba.schema": "a26fbdabbd97f076fcaa3b3774b7eba8",
	    "cosine.schema": "0a85a2dbf9729ceb4bb6354c4c865135",
	    "microsoft.schema": "2ced4df70c8e72f5fa1f857ed3a5c39d",
	    "microsoft.ext.schema": "65dbf5a721b14de93fa011386025ab72"
  	  },
	  "hash": "c3dce06943963c28163db6e5164844a2"
        }
      },
      "hash": "440a3933672304d72660526e4fd1463e"
    }

Basically, every level in the tree is going to have two attributes in the
returned `Hashes` object, a `hash` which is the hash of hashes, and `files`,
which is a key/value pairing of filename to hash.  Each file might be another
object, which indicates there was a directory tree encountered.

## Installation

    npm install dirsum

## License

MIT.

## Bugs

See <https://github.com/mcavage/node-dirsum/issues>.
