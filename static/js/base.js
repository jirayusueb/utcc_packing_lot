let ocr_plate;
let base64_face;
let base64_plate;

const post_plate = async function () {
    const secret_key = "sk_6db061527dc1e4d30b42cd2d"
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset='utf-8'");
    const raw = base64_plate
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=th&secret_key=" + secret_key, requestOptions)
        .then(response => response.json())
        .then(function (data) {
            const {results} = data;
            ocr_plate = results[0].plate;
            console.log(ocr_plate)
        })
        .catch(error => console.log('error', error));
}

const capture_face = async function () {
    console.log(ocr_plate)
}

const post_checkin = async function () {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "face_login": base64_face,
        "plate": ocr_plate,
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("http://localhost:8000/api/checkin/", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const post_checkout = async function () {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "face_logout": base64_face,
        "plate": ocr_plate,
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    await fetch("http://localhost:8000/api/checkout/", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

$('#button-face').click(function () {
    capture_face()
})

$('#button-plate').click(function () {
    post_plate()
})

$('#button-checkin').click(function () {
    post_checkin()
})

$('#button-checkout').click(function () {
    post_checkout()
})