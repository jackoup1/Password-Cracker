async function initDictionaryAttack(correctPassword){

   const passwords = await getDictionaryContent();

    for(pass of passwords){
        if(pass === correctPassword){
            const output = document.querySelector(".correct-Password-js");
            output.textContent = pass;
            output.style.display = "block";
            break;
        }
    };

    //incase dictionary attack didn't success we will use brute force
    
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