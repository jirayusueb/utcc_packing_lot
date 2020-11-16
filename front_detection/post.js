console.log("Post API Ready");
const input_user = document.getElementsByClassName("input_user");
const input_lpn = document.getElementsByClassName("input_lpn");
const button_checkin = document.getElementById("button-checkin");
const button_checkout = document.getElementById("button-checkout");
const image_lpn = document.getElementById("image_lpn");

var secret_key = "sk_7566f8f1b97a362cf28a3b57";
var url_openalpr =
  "https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=th&secret_key=" +
  secret_key;

var data_checkin = {
  data: { status: 0, created_user: 1, updated_user: 1, user: 2, motorcycle: 1 },
};

const options = {
  method: "POST",
  url: "http://0.0.0.0:8000/api/checkin/",
  headers: { "Content-Type": "application/json" },
  data: { status: 0, created_user: 1, updated_user: 1, user: 2, motorcycle: 1 },
};

const post_checkout = () => {
  axios
    .post(
      "http://0.0.0.0:8000/api/checkout/",
      {
        status: 1,
        created_user: 1,
        updated_user: 1,
        user: 2,
        motorcycle: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

function post_checkin() {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

button_checkin.addEventListener("click", post_checkin());
button_checkout.addEventListener("click", post_checkout);
