# Bandwagon.js ![](https://img.shields.io/npm/v/bandwagon.js.svg)

Bandwagon host api<br>
Support all bandwagonhost api.<br>
Check API document [here](https://kiwivm.64clouds.com/main-exec.php?mode=api) or [PDF](./API.pdf)


## Install
```
npm install bandwagon.js
```

## Example
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

## APIs:

### start()
Starts the VPS

### stop()
Stops the VPS

### restart()
Reboots the VPS

### kill()
Allows to forcibly stop a VPS that is stuck and cannot be stopped by normal means. Please use this feature with great care as any unsaved data will be lost.

### getServiceInfo()
Get VPS base service info.

### getLiveServiceInfo()
This function returns all data provided by getServiceInfo. In addition, it provides detailed status of the VPS.
Please note that this call may take up to 15 seconds to complete.

### getAvailableOS()
List operation system can be install your VPS

### reinstallOS(params={os})
Reinstall the Operating System. OS must be specified via "os" variable. Use getAvailableOS call to get list of available systems.

### resetRootPassword()
Generates and sets a new root password.

### getUsageGraphs()
Obsolete, use getRawUsageStats instead

### getRawUsageStats()
Returns a two­dimensional array with the detailed usage statistics shown under [Detailed Statistics](https://kiwivm.64clouds.com/kiwi-main-controls.php?mode=stats) in KiwiVM.

### setHostname(params={newHostname})
Sets new hostname.

### setPRT(params={ip, ptr})
Sets new PTR (rDNS) record for IP.

### basicShellCD(params={currentDir, newDir})
Simulate change of directory inside of the VPS. Can be used to build a shell like Basic shell.

### basicShellExec(params={command})
Execute a shell command on the VPS (synchronously).

### shellScriptExec(params={script})
Execute a shell script on the VPS (asynchronously).

### createSnapshot(params={description})
Create snapshot

### listSnapshot()
Get list of snapshots.

### deleteSnapshot(params={snapshot})
Delete snapshot by fileName (can be retrieved with snapshot/list call).

### restoreSnapshot(params={snapshot})
Restores snapshot by fileName (can be retrieved with snapshot/list call). This will overwrite all data on the VPS.

### toggleSnapshotSticky(params={snapshot, sticky})
Set or remove sticky attribute ("sticky" snapshots are never purged). Name of snapshot can be retrieved with snapshot/list call – look for fileName variable.<br>Set sticky = 1 to set sticky attribute<br>Set sticky = 0 to remove sticky attribute

### exportSnapshot(params={snapshot})
Generates a token with which the snapshot can be transferred to another instance.

### importSnapshot(params={sourceVeid, sourceToken})
Imports a snapshot from another instance identified by VEID and Token. Both VEID and Token must be obtained from another instance beforehand with a snapshot/export call.
Get list of automatic backups.

### listBackup()
Get list of automatic backups.

### copyBackupToSnapshot(params={backup_token})
Copies a backup identified by backup_token (returned by backup/list) into a restorable Snapshot.

### addIPv6(params={ip})
Assigns a new IPv6 address. For initial IPv6 assignment an empty IP is required (call without parameters), and a new IP from the available pool is assigned automatically. All subsequent requested IPv6 addresses must be within the /64 subnet of the first IPv6 address.

### deleteIPv6(params={ip})
Releases specified IPv6 address.

### getMigrateLocations()
Return all possible migration locations.

### startMigrate(params={location})
Start VPS migration to new location. Takes new location ID as input. Note that this will result in all IPv4 addresses to be replaced with new ones, and all IPv6 addresses will be released.

### cloneFromExternalServer(params={externalServerIP, externalServerSSHport, externalServerRootPassword})
(OVZ only) Clone a remote server or VPS. See Migrate from another server for example on how this works.

### getSuspensionDetails()
Retrieve information related to service suspensions.

### unsuspend(params={record_id})
Clear abuse issue identified by record_id and unsuspend the VPS. Refer to getSuspensionDetails call for details.

### getRateLimitStatus()
When you perform too many API calls in a short amount of time, KiwiVM API may start dropping your requests for a few minutes. This call allows monitoring this matter.
