const video = document.getElementById("video");

Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("{%  %}")]).then(
    startVideo
);

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        (stream) => (video.srcObject = stream),
        (err) => console.error(err)
    );
}

video.addEventListener("play", () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = {width: video.width, height: video.height};
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
        );

        canvas.getContext("2d").drawImage(video, 0, 0);
        var image = canvas.toDataURL("image/jpeg");
        console.log(image);
        alert("Done");

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 1000);
});

function postFaceImage(request) {
    axios({
        method: "post",
        url: "http://localhost:8000/api/checkin/",
        data: {
            status: 0,
            created_user: 1,
            updated_user: 1,
            user: 2,
            motorcycle: 1,
        },
    });
}