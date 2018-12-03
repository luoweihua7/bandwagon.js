# Bandwagon.js

Bandwagon host api

# API

Support all bandwagonhost api.
Check API document [here](https://kiwivm.64clouds.com/main-exec.php?mode=api)

Example
```js
const Bandwagon = require('bandwagon.js')
let bwg = new Bandwagon({veid:'YOUR VEID',api_key:'YOUR API KEY'})

bwg.getServiceInfo().then(res=>console.log(res.data));
bwg.resetRootPassword().then(res => {
	let json = res.data;
	if (json && json.password) {
		console.log(`YOUR NEW PASSWORD: ${json.password}`)
	} else {
		console.error(`Reset password failure`);
	}
})
bwg.createSnapshot({description:'NEW_SNAPSHOT'}).then(res=>console.log(res.data))
```

API List:

* start
* stop
* restart
* kill
* getServiceInfo
* getLiveServiceInfo
* getAvailableOS
* reinstallOS
* resetRootPassword
* getUsageGraphs
* getRawUsageStats
* setHostname
* setPRT
* basicShellCD
* basicShellExec
* shellScriptExec
* createSnapshot
* listSnapshot
* deleteSnapshot
* restoreSnapshot
* toggleSnapshotSticky
* exportSnapshot
* importSnapshot
* listBackup
* copyBackupToSnapshot
* addIPv6
* deleteIPv6
* getMigrateLocations
* startMigrate
* cloneFromExternalServer
* getSuspensionDetails
* unsuspend
* getRateLimitStatus
