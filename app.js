const API_KEY ="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"
const submitButton = document.querySelector("#submit")
const ouputElement = document.querySelector(".output")
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')
function clearInput(){
  inputElement.value="";
}
function changeInput(value){
  const inputElement = document.querySelector('input');
  inputElement.value = value ;
}
async function getMassage() {
  const options= {
    method:"POST",
    headers:{
      'Content-Type':"application/json; charset=utf8",  
      'Authorization': `Bearer ${API_KEY}`
    },
    body:JSON.stringify(
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user",content: inputElement.value}],
        max_tokens: 100,
      }
    )
  }
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions",options)
    const data = await response.json();
    const outPutElement = document.createElement('p');
    outPutElement.textContent =data.choices[0].message.content
    ouputElement.append(outPutElement);
    // ouputElement.textContent = data.choices[0].message.content;
    const inputText = inputElement.value;
    console.log(inputText);
    inputElement.value="";
    if(data.choices[0].message.content && inputText){
      const pElement = document.createElement('p');
      pElement.textContent = inputText;
      pElement.addEventListener('click',()=>changeInput(pElement.textContent))
      historyElement.append(pElement);
    }
  } catch (error) {
    console.error(error);
  }
}
submitButton.addEventListener("click",getMassage);
buttonElement.addEventListener('click',clearInput);