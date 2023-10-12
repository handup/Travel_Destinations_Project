const selectedDestinationString = localStorage.getItem('selectedDestination');
const selectedDestination = JSON.parse(selectedDestinationString);
const urlParams = new URLSearchParams(window.location.search);
const isUpdate = urlParams.get('update');
const destinationId = urlParams.get('id');

(async () => {

const base64ToImage = (base64) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    image.src = base64;
  });
};

const imageToCanvas = (image) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    resolve(canvas);
  });
};

const canvasToBase64 = (canvas)  => {
  return new Promise((resolve, reject) => {
    resolve(canvas.toDataURL());
  });
};


if (selectedDestination) {
  document.getElementById('country').value = selectedDestination[0].country;
  document.getElementById('link').value = selectedDestination[0].link;
  document.getElementById('title').value = selectedDestination[0].title;

  const arrivalDate = new Date(selectedDestination[0].arrivalDate);
  const formattedArrivalDate = arrivalDate.toISOString().slice(0, 10);

  const departureDate = new Date(selectedDestination[0].arrivalDate);
  const formattedDepartureDate = departureDate.toISOString().slice(0, 10);

  let imageInput = document.getElementById('image');
  let previewImage = document.getElementById('preview');

  document.getElementById('description').value = selectedDestination[0].description;
  document.getElementById('arrivalDate').value = formattedArrivalDate;
  document.getElementById('departureDate').value = formattedDepartureDate;

  originalBase64File = selectedDestination[0].image;

  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule("input[type='file'] { color: transparent; background-color: white; }", styleSheet.cssRules.length);

  imageInput.src = originalBase64File;
  const fileName = document.createTextNode(`Existing file: ${selectedDestination[0].imageName}`);
  imageInput.parentNode.insertBefore(fileName, imageInput.nextSibling);
 
  const imageElement = await base64ToImage(originalBase64File);
  const canvasElement = await imageToCanvas(imageElement);
  const base64Data = await canvasToBase64(canvasElement);

  previewImage.src = base64Data;

  imageInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const base64Data = await imageToBase64(file);

    previewImage.src = base64Data;
    
    const fileName = document.createTextNode(`Added file: ${file.name}`);
    imageInput.nextSibling.remove();
    imageInput.parentNode.insertBefore(fileName, imageInput.nextSibling);
  });

  localStorage.removeItem('selectedDestination');

} else {

  let previewImage = document.getElementById('preview');
  previewImage.style.display = 'none';
}
})();

const imageToBase64 = (file) =>
new Promise((resolve, reject) => {


  if( file === undefined){ 
    resolve(originalBase64File) 
  } else {
    if(file.type === "file") {
      resolve(originalBase64File)
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    }
  }
});

const createForm = document.getElementById("createForm");
const submitBtn = document.getElementById("submitBtn");

// Sample destinations data
const destinations = [];

submitBtn.addEventListener("click", async () => {
// Get form values
const country = document.getElementById("country").value;
const link = document.getElementById("link").value;
const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const arrivalDate = document.getElementById("arrivalDate").value;
const departureDate = document.getElementById("departureDate").value;
const image = await imageToBase64(document.getElementById("image").files[0]); // Assuming a single image file
const imageName = document.getElementById("image").files[0] !== undefined ? document.getElementById("image").files[0].name : selectedDestination[0].imageName;

// Create a destination object
const destination = {
  country,
  link,
  title,
  description,
  arrivalDate,
  departureDate,
  image,
  imageName
};



if (urlParams.get('update') === "false") {

  const response = await fetch("http://localhost:3000/destinations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(destination),
  });

  window.location.replace("./index.html");
} else {

  try {
    const response = await fetch(`http://localhost:3000/destinations/${destinationId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(destination)
    });
          
    const result = await response.text();
      if(result.includes("updated")){
      window.location.replace("./index.html");
      }

    } catch (error) {
    console.error('Error deleting destination:', error);
    }
}

});

//Cancel button taking back to home
document.querySelector("#cancelBtn").addEventListener("click", function (e) {
e.preventDefault();
window.location.replace("./index.html");
});