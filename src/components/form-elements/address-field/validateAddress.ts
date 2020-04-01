export function validateAddress(
  inputAddress: string,
  url: string
): Promise<string> {
  let address = inputAddress.trim();
  address = address.replace("  ", " "); //in case the user types in 2 spaces

  return new Promise(function (resolve, reject) {
    fetch(url + "/autocomplete/?" + formatParams({ q: address }), {
      mode: "cors",
    })
      .then(
        (response) => response.json(),
        () => {
          reject(Error("Couldn't read the DAWA service"));
        }
      )
      .then(function (data) {
        if (data) {
          data.forEach((item: any) => {
            if (item.tekst === address) {
              resolve(item.data.postnr);
            }
          });
        } else {
          reject();
        }
      });
  });
}

function formatParams(params: any) {
  return Object.keys(params)
    .map(function (paramName: string) {
      let paramValue = params[paramName];
      return paramName + "=" + encodeURIComponent(paramValue);
    })
    .join("&");
}
