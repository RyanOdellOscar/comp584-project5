// javascript for getting data from an API and displaying it on the webpage
// as well displaying the animation functionality on the webpage

const dataContainer = document.getElementById('api-data');
var product;
const NutellaData = "https://world.openfoodfacts.net/api/v2/product/3017624010701?fields=product_name,nutriscore_data,nutriments,nutrition_grades"
const logoLink = "https://images.openfoodfacts.net/images/products/301/762/401/0701/front_en.54.400.jpg"

const logo = document.querySelector('.logo.js');
const button = document.querySelector('.animation button');
let rotations = 0;

button.addEventListener('click', () => {
  rotations++;
  button.textContent = `rotations: ${rotations}`;
  logo.animate(
    [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
    { duration: 1000, easing: 'ease-out' }
  );
});

// API call and display
fetch(NutellaData, {
  method: "GET",
  headers: { Authorization: "Basic " + btoa("off:off") },
})
  .then((response) => response.json())
  .then((json) => {
    product = json.product;
    document.getElementById('name').textContent = product.product_name;
    document.getElementById('code').textContent = json.code;
    const nutriscore = document.getElementById('nutriscore');
    nutriscore.textContent = Object.entries(product.nutriscore_data || {})
      .map(([key, value]) => {
        if (key === 'components' && value) {
          return Object.entries(value).map(([type, components]) =>
            `${type}:\n${components.map(({ id, value, unit, points, points_max }) =>
              `  ${id}: ${value ?? '—'}${unit ? ` ${unit}` : ''} (points: ${points}/${points_max})`
            ).join('\n')}`
          ).join('\n');
        }
        return `${key}: ${value}`;
      })
      .join('\n');
    nutriscore.style.whiteSpace = 'pre-line';

    const nutriments = document.getElementById('nutriments');
    nutriments.textContent = Object.entries(product.nutriments || {})
      .map(([key, value]) => `${key}: ${typeof value === 'object' && value !== null ? JSON.stringify(value) : value}`)
      .join('\n');
    nutriments.style.whiteSpace = 'pre-line';
    console.log(product);
  })
  .catch((error) => console.error("Error fetching data:", error));

document.querySelector('.logo.js').src = logoLink;

  // End of script
