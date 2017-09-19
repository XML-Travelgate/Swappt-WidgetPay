"use strict";

var Card = (function() {
  function Card(number, expiration_month, expiration_year, security_code) {
    this.number = number;
    this.expiration_month = expiration_month;
    this.expiration_year = expiration_year;
    this.security_code = security_code;
  }
  return Card;
})();

(function() {
  document.getElementById("card-button").addEventListener("click", function() {
    event.preventDefault();
    var number = document.getElementById("card-number").value;
    var month = document.getElementById("card-month").value;
    var year = document.getElementById("card-year").value;
    var cvv = document.getElementById("card-cvv").value;
    var card = new Card(number, month, year, cvv);

    var publicKey = `-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAonHpxKpoWhhg3v2pbCXjLsLVTs0WpuvrYBLUYVxSsBLvg9IsgIyf0hZ6Y3pQMvtaGnq+994RYkTGjcGPU49B4TJ1VNXB7AguRLu1WK2NQx3BbyunTQPHP4nBp+Ok48ff2ez9K2v7jyeM7S9rjEYBBg7/YAJoF9uDswYgXV4aCcNnL1dCSI1KJ7rnLBiunQAyDW5UWjf1v3BKiQm1AZl3U7rwXTTvRYKlRdrwLFPeD8Ndkp9ODF2drRBIBw24jROqYXkTOLq1jqRCxs9CfrCGr+ce2co+AApNoKCMlIdHH1RAT87CMSmv6yZkFwDdA/PJEwxZbuWEF8hDPJscpRnY2QIDAQAB-----END PUBLIC KEY-----`;

    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    var encrypted = encrypt.encrypt(JSON.stringify(card));

    saveCard(encrypted);
  });
})();

function saveCard(encrypted) {
  var form = document.getElementById("card-form");
  form.reset();
  var hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "card-token");
  hiddenInput.setAttribute("value", encrypted);
  form.appendChild(hiddenInput);
}
