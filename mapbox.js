const axios = require("axios");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Location: ", async (location) => {
  const loc = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoidHVyYmF5YXIiLCJhIjoiY2wwYWc4Mm96MDBxdDNkbWo5eWNjZ21vZiJ9.yQUAfjQWJdDuxktSX7AqAA`
  );
  // .then((res) => {
  //   const features = res.data.features;
  //   features.forEach((el, i) => {
  //     console.log(
  //       i + ` . ${( el.place_name)}- ийн коордоинат сбол ${
  //         el.geometry.coordinates
  //       }`
  //     );
  //   });
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  const features = loc.data.features;
  coordinate = [];
  features.forEach((el, i) => {
    placeName = el.place_name;
    coordinate.push(el.geometry.coordinates);
    console.log(
      `${i + 1} . ${placeName}- ийн коордоинат бол ${el.geometry.coordinates}`
    );
  });
  rl.question("Dugaar songo : ", (num) => {
    num = Number(num);
    if (coordinate.length >= num) {
      let url = `https://api.darksky.net/forecast/81d38b9c958eb018e01083a72b0926b5/${
        coordinate[num - 1][1]
      },${coordinate[num - 1][0]}`;
        axios
          .get(url)
          .then((res) => {
            let temp = (res.data.currently.temperature - 32) * 1.8;

            console.log(`Яг одоо гадаа ${temp.toFixed(2)} C° градус`);
          })
          .catch((err) => {
            console.log("err");
          });
      
    } else {
      console.log("zuw too oruul");
    }

    rl.close();
  });
});
