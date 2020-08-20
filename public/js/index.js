console.log('hello you are connected with us !');


const p1 = document.querySelector('#msg-1');
const p2 = document.querySelector('#msg-2');

const weatherForm = document.querySelector('form');
const searchText = document.querySelector('input');

weatherForm.addEventListener('submit' ,(e)=> {
    e.preventDefault();

    const location = searchText.value;
    p1.textContent = 'Loading...';
    p2.textContent = "";
    
    if (location) {
        
        fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    // console.log(data.error)
                    p1.textContent = data.error;
                } else {
                    // console.log(data.location);
                    p1.textContent = data.location;
                    // console.log(data.forecast);
                    p2.textContent = data.forecast;
                }
            })
        })
    } else {
        // console.log('please provide a address!! ')
        p1.textContent = 'Please provide a valid address! Thank you'
    }

})









// fetch("http://localhost:3000/weather?address=Bosten").then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })
