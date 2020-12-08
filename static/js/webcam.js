const video = document.getElementById('video')

const button_plate = document.getElementById('button-plate')
const button_face = document.getElementById('button-face')

const secret_key = "sk_7566f8f1b97a362cf28a3b57"
const img = document.getElementById('photo')
let select = document.querySelector('select#videoSource');
let currentStream;
let myVar = null;
let canvas2 = null;
let plate = ''
let face = ''

navigator.mediaDevices.enumerateDevices().then(gotDevices)

select.onchange = function () {
    // console.log("change");
    if (typeof currentStream !== 'undefined') {
        stopMediaTracks(currentStream);
    }
    const videoConstraints = {};
    if (select.value === '') {
        videoConstraints.facingMode = 'environment';
    } else {
        videoConstraints.deviceId = {exact: select.value};
        // console.log(videoConstraints);
        // console.log(select.value)
        window.videoname = select.value
    }
    const constraints = {
        video: videoConstraints,
        audio: false
    };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
            currentStream = stream;
            video.srcObject = stream;
        })
        .then(gotDevices)
        .catch(error => {
            // console.log(error);
        });
}

function gotDevices(deviceInfos) {
    window.deviceInfos = deviceInfos; // make available to console
    // console.log('Available input and output devices:', deviceInfos);
    for (const deviceInfo of deviceInfos) {
        const option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'videoinput') {
            option.text = deviceInfo.label || `Camera ${select.length + 1}`;
            select.appendChild(option);
        }
    }
    if (typeof currentStream == 'undefined') {
        startVideo();
    }
}

function startVideo() {
    navigator.getUserMedia({video: {}},
        stream => {
            video.srcObject = stream;
            currentStream = stream;
        },
        err => console.log(err)
    )
}

function stopMediaTracks(stream) {
    // console.log("stop");
    // clearInterval(myVar);
    stream.getTracks().forEach(track => {
        track.stop();
    });
}

video.addEventListener('stop', () => {
    // console.log("vidio stop")
});

video.addEventListener("ended", () => {
    // console.log("video stop");
});

async function post_plate(base64_plate) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json; charset='utf-8'");
    let raw = base64_plate
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=th&secret_key=sk_7566f8f1b97a362cf28a3b57", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

video.addEventListener('play', () => {
    clearInterval(myVar)
    var canvas = faceapi.createCanvasFromMedia(video)
    canvas2 = canvas;
    // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    var canvas_content = document.getElementById('canvas')

    canvas_content.append(canvas)
    var displaySize = {width: video.width, height: video.height}

    faceapi.matchDimensions(canvas, displaySize)

    myVar = setInterval(async () => {
        button_face.onclick = video.onclick = function () {
            document.getElementById('videoSource').selectedIndex = '1';
            select.onchange()
            canvas.getContext("2d").drawImage(video, 0, 0, 320, 240)
            face = canvas.toDataURL("image/png;base64,").split(",")[1];
            console.log(face)
        };
        button_plate.onclick = video.onclick = function () {
            document.getElementById('videoSource').selectedIndex = '0';
            select.onchange()

            canvas.getContext("2d").drawImage(video, 0, 0, 320, 240)
            // plate = canvas.toDataURL("image/png;base64,").split(",")[1];
            plate = canvas.toDataURL("image/png;base64,")
            console.log(plate)
            // await post_plate(plate)

            // await fetch(
            //     "https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=th&secret_key=" +
            //     secret_key,
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": 'application/json; charset="utf-8"',
            //         },
            //         body: plate,
            //     }
            // ).then(function (response) {
            //     return response.json();
            // }).then(function (data) {
            //     const {results} = data;
            //     // const data_res = document.getElementById("response");
            //     // data_res.innerHTML = `<p>Plat
            //             // await fetch(
            //             //     "https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=th&secret_key=" +
            //             //     secret_key,
            //             //     {
            //             //         method: "POST",
            //             //         headers: {
            //             //             "Content-Type": 'application/json; charset="utf-8"',
            //             //         },
            //             //         body: plate,
            //             //     }
            //             // ).then(function (response) {
            //             //     return response.json();
            //             // }).then(function (data) {
            //             //     const {results} = data;
            //             //     // const data_res = document.getElementById("response");
            //             //     // data_res.innerHTML = `<p>Plate: ${results[0].plate}<br>Province ID: ${
            //             //     //     results[0].region.split("-")[1]
            //             //     // }</p>`;
            //             //     let ocr_plate = results[0];
            //             //     console.log(ocr_plate)
            //             // });e: ${results[0].plate}<br>Province ID: ${
            //     //     results[0].region.split("-")[1]
            //     // }</p>`;
            //     let ocr_plate = results[0];
            //     console.log(ocr_plate)
            // });
        };
    }, 100)

})