$(document).ready(function () {
    //localStorage.setItem('license', 'abc123');
    localStorage.setItem('license', '1f09d30c707d53f3d16c530dd73d70a6ce7596a9');
    
    $("#version-button").click(function (e) {
        var signer = new Signer();
        signer.getVersionAsync().then(function (result) {
            $("#version-result").text(result);
        }, function (error) {
            $("#version-result").text(error);
        });

    });

    $("#certificate-button").click(function (e) {
        var signer = new Signer();
        signer.getCertificatesAsync().then(function (result) {
            localStorage.setItem('certificates', JSON.stringify(result));
            $("#certificate-list").empty();
            $.each(result, function(a, b) {
                var serialNumber = b[0].serialNumber;
                var opt = "<option value=\""+serialNumber+"\">"
                    + b[0].subjectDN + "</option>";
                    $("#certificate-list").append(opt);
            });
        }, function (error) {
            $('#certificate-result').text(error);
        })
    });

    $("#sign-button").click(function (e) {
        var serialNo = $("#certificate-list").val();
        var signer = new Signer();
        signer.setData("hello");
        signer.setSigner(serialNo);
        signer.getSignAsync().then(function (result) {
            $("#sign-result").text(result);
        }, function (error) {
            $('#sign-result').text(error);
        })
    });

    $("#signjson-button").click(function (e) {
        // var json = {
        //     "column1": {
        //         "filledBy": "1",
        //         "val": "officer 1"
        //     },
        //     "column2": {
        //         "filledBy": "2",
        //         "val": "bidder 1"
        //     }
        // };

        var json = { "15": "20000", "19": "30000", "23": "1000" };

        var signer = new Signer();
        var serialNo = $("#certificate-list").val();

        signer.setJson(json);
        signer.setSigner(serialNo);
        signer.getSignJsonAsync().then(function (result) {
            //console.log(result);
            $("#signjson-result").text(result);
        }, function (error) {
            $('#signjson-result').text(error);
        })
    });

    $("#encrypt-button").click(function (e) {
        var signer = new Signer();
        var serialNumber = $("#certificate-list").val();

        var certificates = localStorage.getItem('certificates');
        certificates = JSON.parse(certificates);
        $.each(certificates, function(a, b) {
            
            //console.log(b[0].serialNo, serialNo);
            if(b[0].serialNumber == serialNumber) {
                console.log(serialNumber);
                signer.setEncryptor(b[0].encodedCertificate);
            }
        })
        signer.setData("hello");
        // signer.setEncryptor(serialNo);
        signer.getEncryptAsync().then(function (result) {
            $("#encrypt-result").text(result);
        }, function (error) {
            $('#encrypt-result').text(error);
        })
    });

    $("#decrypt-button").click(function (e) {
        var signer = new Signer();
        var encrypted = $('#encrypt-result').val();
        var serialNo = $("#certificate-list").val();
        signer.setEncrypt(encrypted);
        signer.setEncryptor(serialNo)
        signer.getDecryptAsync().then(function (result) {
            $("#decrypt-result").text(result);
        }, function (error) {
            $('#decrypt-result').text(error);
        })
    });

    $("#verify-button").click(function (e) {
        var signer = new Signer();
        var signed = $('#sign-result').val();
        signer.setSign(signed);
        signer.getVerifyAsync().then(function (result) {
            $("#verify-result").text(result);
        }, function (error) {
            $('#verify-result').text(error);
        })
    });

    $('#verifyjson-button').click(function() {
        var signer = new Signer();
        var signed = $('#signjson-result').val();
        
        signer.setSign(signed);
        signer.getVerifyJsonAsync().then(function(result) {
            $('#verifyjson-result').text(result);
        }, function(error) {
            $('#verifyjson-result').text(error);
        })
    });

    $("#encryptjson-button").click(function (e) {
        var json = { "15": "20000", "19": "30000", "23": "1000" };

        var signer = new Signer();

        signer.setJson(json);
        var serialNumber = $("#certificate-list").val();

        var certificates = localStorage.getItem('certificates');
        certificates = JSON.parse(certificates);
        $.each(certificates, function(a, b) {
            
            //console.log(b[0].serialNo, serialNo);
            if(b[0].serialNumber == serialNumber) {
                console.log(serialNumber);
                signer.setEncryptor(b[0].encodedCertificate);
            }
        });
        signer.getEncryptJsonAsync().then(function (result) {
            //console.log(result);
            $("#encryptjson-result").text(result);
        }, function (error) {
            $('#encryptjson-result').text(error);
        })
    });
    $('#decryptjson-button').click(function() {
        var signer = new Signer();
        var signed = $('#encryptjson-result').val();
        var serialNo = $("#certificate-list").val();

        signer.setEncrypt(signed);
        signer.setEncryptor(serialNo);
        signer.getDecryptJsonAsync().then(function(result) {
            $('#decryptjson-result').text(result);
        }, function(error) {
            $('#decryptjson-result').text(error);
        })
    });

});