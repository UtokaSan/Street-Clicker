//   192.168.1.31 à Lourdes
//   192.168.1.45 à Toulouse

// Plus tard ;) V 2 du creator Admin

// let VerificatorColor = [
//   "aqua",
//   "black",
//   "blue",
//   "fuchsia",
//   "gray",
//   "green",
//   "lime",
//   "maroon",
//   "navy",
//   "olive",
//   "purple",
//   "red",
//   "silver",
//   "teal",
//   "white",
//   "yellow",
// ];

// const TranslatorColor = {
//   Couleur: [
//     { black: "#00000" },
//     { blue: "#0000FF" },
//     { fuchsia: "#FF00FF" },
//     { gray: "#808080" },
//     { green: "#008000" },
//     { lime: "#00FF00" },
//     { maroon: "#000080" },
//     { navy: "#000080" },
//     { olive: "#808000" },
//     { purple: "#800080" },
//     { red: "#FF0000" },
//     { silver: "#C0C0C0" },
//     { teal: "#008080" },
//     { white: "#FFFFFF" },
//     { yellow: "#FFFF00" },
//   ],
// };

// -------------------------------------------------

var crypt = {
  secret: `+j&l$?/t{/8?xZk:E~<}&%w>&yT%I!gg&/SVe,;=aqT4&<y?}c#CWrXbEsc!t=xg|T(dNsU".$V)+h$0XzC0=z/Ye$Ap+%>cn,W`,
};

const encryption = (password) => {
  var password_input = CryptoJS.AES.encrypt(password, crypt.secret);
  password_input = password_input.toString();
  return password_input;
};

console.log(encryption("Theos123@hotmail.fr"));
