$(document).ready(function () {
  $(".parallax").parallax();
  $(".sidenav").sidenav();

  const zipModal = document.getElementById("zipModal");
  const zipModalInstance = M.Modal.init(zipModal, { dismissible: false });

  getUserData().then((data) => {
    if (!data.zip) {
      $(".mainContent").hide();
      zipModalInstance.open();
    } else {
      getWeather().then((res) => {
        $("#cityName").text(res.name);
        $("#tempText").text(`${Math.round(res.main.temp)} F°`);
        $("#humidityText").text(`${Math.round(res.main.humidity)} %`);
        $("#wspeedText").text(`${Math.round(res.wind.speed)} mph`);
        $("#wdirText").text(convertDegToDirection(res.wind.deg));
        $("#sunriseText").text(convertToTime(res.sys.sunrise));
        $("#sunsetText").text(convertToTime(res.sys.sunset));
      });
    }
  });

  $("#zipForm").on("submit", function (e) {
    e.preventDefault();

    const zipData = {
      zip: $("#zipInput").val().trim(),
    };

    setZip(zipData)
      .then(() => window.location.replace("/"))
      .catch((err) => console.log(err));
  });
});

const getUserData = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "/api/dashboard",
    }).then((userInfo) => {
      resolve(userInfo);
    });
  });
};

const setZip = (zip) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/api/zip",
      data: zip,
    }).then(
      (res) => resolve(res),
      (err) => reject(err)
    );
  });
};

const getWeather = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "/api/weather",
    }).then((response) => {
      resolve(response);
    });
  });
};

const convertDegToDirection = (deg) => {
  let direction = "";
  switch (true) {
    case deg >= 360 && deg <= 21:
      direction = "N";
      break;
    case deg >= 22 && deg <= 44:
      direction = "NNE";
      break;
    case deg >= 45 && deg <= 66:
      direction = "NE";
      break;
    case deg >= 67 && deg <= 89:
      direction = "ENE";
      break;
    case deg >= 90 && deg <= 111:
      direction = "E";
      break;
    case deg >= 112 && deg <= 134:
      direction = "ESE";
      break;
    case deg >= 135 && deg <= 156:
      direction = "SE";
      break;
    case deg >= 157 && deg <= 179:
      direction = "SSE";
      break;
    case deg >= 180 && deg <= 201:
      direction = "S";
      break;
    case deg >= 202 && deg <= 224:
      direction = "SSW";
      break;
    case deg >= 225 && deg <= 246:
      direction = "SW";
      break;
    case deg >= 247 && deg <= 269:
      direction = "WSW";
      break;
    case deg >= 270 && deg <= 291:
      direction = "W";
      break;
    case deg >= 292 && deg <= 314:
      direction = "WNW";
      break;
    case deg >= 315 && deg <= 336:
      direction = "NW";
      break;
    case deg >= 337 && deg <= 359:
      direction = "NNW";
      break;
    default:
      direction = "no data";
  }

  return direction;
};

const convertToTime = (timestamp) => {
  var date = new Date(timestamp * 1000);
  var timestr = date.toLocaleTimeString();
  return timestr;
};
