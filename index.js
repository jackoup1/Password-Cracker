//Hard coded correct password
const correctPassword = "aAAFB";

//listener to form submition 
document.getElementById('cracker-form').addEventListener("submit",async event =>{
    event.preventDefault();
    await initAttack(correctPassword);
})

async function initAttack(correctPassword){

    //getting passwords from the dectionary 
   const passwords = await getDictionaryContent();

    //looping through all passwords in the dictionary to find the correct one then display it in the span
    for(pass of passwords){
        if(pass === correctPassword){
            displayPassword(pass);
            return;
        }
    }
    
    //incase dictionary attack didn't success we will use brute force
    const password = initBruteForceAttack(correctPassword);

    //displaying the output
    displayPassword(password);
}

function initBruteForceAttack(correctPassword) { 
    console.log("Target Password:", correctPassword);

    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const passArray = ["A", "A", "A", "A", "A"];

    for (let i = 0; i < alpha.length; i++) {
        passArray[0] = alpha[i];
        for (let j = 0; j < alpha.length; j++) {
            passArray[1] = alpha[j];
            for (let k = 0; k < alpha.length; k++) {
                passArray[2] = alpha[k];
                for (let l = 0; l < alpha.length; l++) {
                    passArray[3] = alpha[l];
                    for (let m = 0; m < alpha.length; m++) {
                        passArray[4] = alpha[m];

                        let pass = passArray.join(""); // Convert array to string

                        if (pass === correctPassword) {
                            console.log("Password Found:", pass);
                            return pass;
                        }
                    }
                }
            }
        }
    }

    console.log("Password not found!");
    return null;
}


async function getDictionaryContent() {
    try{
       const response =  await (fetch("../data/password.txt"));
       if(!response.ok) throw new Error("Failed to load the dictionary");
       const content = (await response.text()).split(/\r?\n/);

       return content;
    }catch (error) {
        console.error('Error loading file:', error);
    }
}

function displayPassword(pass){
    const output = document.querySelector(".correct-password-js");
    output.textContent =`Password found succesfully: ${pass}`;
    output.style.display = "block";
}