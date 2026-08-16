export const site = {
  name: "Bite Maadi",
  phone: "+91 820 257 6104",
  phoneHref: "tel:+918202576104",
  addressLines: [
    "12, Krishna Temple Road",
    "Manipal, Udupi",
    "Karnataka 576104, India",
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=12%20Krishna%20Temple%20Road%2C%20Manipal%2C%20Udupi%2C%20Karnataka%20576104",
};

export function inr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
