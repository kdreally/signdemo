function Signer() {
    this.isClientRunningAsync = function () {
        return new Promise(function (resolve, reject) {
            if (true) {
                resolve(true);
            } else {
                reject(false);
            }
        })
    }

    this.getVersionAsync = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/version').then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.text());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }

    this.getCertificatesAsync = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/certificates').then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.json());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }


    this.getSignAsync = function () {
        var self = this;
        var data = {
            data: this.data,
            signer: this.signer,
            license: localStorage.license
        };

        var params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/sign', params).then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.text());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }

    this.getVerifyAsync = function () {
        var self = this;
        var data = {
            data: this.sign,
            signer: this.signer,
            license: localStorage.license
        };

        var params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/verify', params).then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.text());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }

    this.getSignJsonAsync = function () {
        var self = this;
        var data = {
            data: JSON.stringify(this.json),
            signer: this.signer,
            license: localStorage.license
        };

        var params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/signjson', params).then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.text());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }

    this.getVerifyJsonAsync = function () {
        var self = this;
        var data = {
            data: this.sign,
            signer: this.signer,
            license: localStorage.license
        };

        var params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/verifyjson', params).then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.text());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }

    this.getEncryptAsync = function () {
        var self = this;
        var data = {
            data: this.data,
            signer: this.encryptor,
            license: localStorage.license
        };

        var params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/encrypt', params).then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.text());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }

    this.getDecryptAsync = function () {
        var self = this;
        var data = {
            data: this.encrypt,
            signer: this.encryptor,
            license: localStorage.license
        };

        var params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/decrypt', params).then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.text());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }

    this.getEncryptJsonAsync = function () {
        var self = this;
        var data = {
            data: JSON.stringify(this.json),
            signer: this.encryptor,
            license: localStorage.license
        };

        var params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/encryptjson', params).then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.text());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }

    this.getDecryptJsonAsync = function () {
        var self = this;
        var data = {
            data: this.encrypt,
            signer: this.encryptor,
            license: localStorage.license
        };

        var params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return new Promise(function (resolve, reject) {
            fetch(self.urlprefix + '/decryptjson', params).then(function (r) {
                if (!r.ok) {
                    reject(r);
                } else {
                    resolve(r.text());
                }
            }).catch(function (r) {
                reject(r);
            });
        });
    }

    this.setData = function (data) {
        this.data = data;
    }

    this.getData = function () {
        return this.data;
    }

    this.setJson = function (data) {
        this.json = data;
    }

    this.getJson = function () {
        return this.json;
    }

    this.setSigner = function (certificate) {
        this.signer = certificate;
    }

    this.getSigner = function () {
        return this.signer;
    }

    this.setSign = function (sign) {
        this.sign = sign;
    }

    this.setEncryptor = function (encryptor) {
        this.encryptor = encryptor;
    }

    this.getEncryptor = function () {
        return this.encryptor;
    }

    this.setEncrypt = function (data) {
        this.encrypt = data;
    }

    this.data = "";
    this.signer = null;
    this.encryptor = null;
    this.sign = "";
    this.encrypt = "";
    this.json = "";
    this.urlprefix = "http://localhost:31416/api";
};