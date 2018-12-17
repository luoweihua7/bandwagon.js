const axios = require('axios')

const API_METHODS = {
  "start": {
    "name": "start",
    "params": []
  },
  "stop": {
    "name": "stop",
    "params": []
  },
  "restart": {
    "name": "restart",
    "params": []
  },
  "kill": {
    "name": "kill",
    "params": []
  },
  "getServiceInfo": {
    "name": "getServiceInfo",
    "params": []
  },
  "getLiveServiceInfo": {
    "name": "getLiveServiceInfo",
    "params": []
  },
  "getAvailableOS": {
    "name": "getAvailableOS",
    "params": []
  },
  "reinstallOS": {
    "name": "reinstallOS",
    "params": ['os']
  },
  "resetRootPassword": {
    "name": "resetRootPassword",
    "params": []
  },
  "getUsageGraphs": {
    "name": "getUsageGraphs",
    "params": []
  },
  "getRawUsageStats": {
    "name": "getRawUsageStats",
    "params": []
  },
  "setHostname": {
    "name": "setHostname",
    "params": ['newHostname']
  },
  "setPRT": {
    "name": "setPRT",
    "params": ['ip', 'ptr']
  },
  "basicShellCD": {
    "name": "basicShell/cd",
    "params": ['currentDir', 'newDir']
  },
  "basicShellExec": {
    "name": "basicShell/exec",
    "params": ['command']
  },
  "shellScriptExec": {
    "name": "shellScript/exec",
    "params": ['script']
  },
  "createSnapshot": {
    "name": "snapshot/create",
    "params": ['description']
  },
  "listSnapshot": {
    "name": "snapshot/list",
    "params": []
  },
  "deleteSnapshot": {
    "name": "snapshot/delete",
    "params": ['snapshot']
  },
  "restoreSnapshot": {
    "name": "snapshot/restore",
    "params": ['snapshot']
  },
  "toggleSnapshotSticky": {
    "name": "snapshot/toggleSticky",
    "params": ['snapshot', 'sticky']
  },
  "exportSnapshot": {
    "name": "snapshot/export",
    "params": ['snapshot']
  },
  "importSnapshot": {
    "name": "snapshot/import",
    "params": ['sourceVeid', 'sourceToken']
  },
  "listBackup": {
    "name": "backup/list",
    "params": []
  },
  "copyBackupToSnapshot": {
    "name": "backup/copyToSnapshot",
    "params": ['backup_token']
  },
  "addIPv6": {
    "name": "ipv6/add",
    "params": ['ip']
  },
  "deleteIPv6": {
    "name": "ipv6/delete",
    "params": ['ip']
  },
  "getMigrateLocations": {
    "name": "migrate/getLocations",
    "params": []
  },
  "startMigrate": {
    "name": "migrate/start",
    "params": ['location']
  },
  "cloneFromExternalServer": {
    "name": "cloneFromExternalServer",
    "params": ['externalServerIP', 'externalServerSSHport', 'externalServerRootPassword']
  },
  "getSuspensionDetails": {
    "name": "getSuspensionDetails",
    "params": []
  },
  "unsuspend": {
    "name": "unsuspend",
    "params": ['record_id']
  },
  // When you perform too many API calls in a short amount of time, 
  // KiwiVM API may start dropping your requests for a few minutes. 
  // This call allows monitoring this matter.
  "getRateLimitStatus": {
    "name": "getRateLimitStatus",
    "params": []
  }
}

class Bandwagon {
  constructor({ veid, api_key, method = 'GET' } = {}) {
    this._veid = veid
    this._api_key = api_key
    this._method = method
    this._baseUrl = `https://api.64clouds.com/v1/`

    this.addMethods()
  }

  addMethods() {
    Object.keys(API_METHODS).forEach(funcName => {
      let API = API_METHODS[funcName]

      this[funcName] = async data => {
        let params = API.params || [];
        let missingField = ''
        let isParamsInvalid = params.some(p => {
          let isNotExist = typeof data[p] === 'undefined';
          if (isNotExist) {
            missingField = p
          }

          return isNotExist
        })

        if (isParamsInvalid) {
          throw new Error(`Missing required field: ${missingField}`)
        }

        let options = {
          url: this._baseUrl + API.name,
          params: {
            veid: this._veid,
            api_key: this._api_key,
            ...data
          },
          method: this._method || 'GET',
        };

        let result = await axios(options)
        return result
      }
    })
  }
}

module.exports = Bandwagon