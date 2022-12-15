let addbtn=document.querySelector(".add");
let removebtn=document.querySelector(".remove-btn");
let modalcont=document.querySelector(".modal-cont");
let addflag=false;
let removeflag=false;
let maincont=document.querySelector(".main-cont");
let textareacont=document.querySelector(".textarea-cont");
let allPrioritycolors=document.querySelectorAll(".priority-color");

let colors=["lightpink","lightgreen","lightblue","lightblack"];
let modalPrioritycolor=colors[colors.length-1];
removebtn.addEventListener("click",()=>{
   removeflag=!removeflag;
   console.log(removeflag);
   
   
})


//listner for modal ka priority colouring

allPrioritycolors.forEach((colorElem,idx)=>{
   colorElem.addEventListener("click",(e)=>{
      allPrioritycolors.forEach((priorityColorElem,idx)=>{
         priorityColorElem.removeAttribute("purpose");
      })
      colorElem.setAttribute("purpose","border");
      modalPrioritycolor=colorElem.classList[1];
   })
})

addbtn.addEventListener("click",(e)=>{
   addflag=!addflag
   if(addflag){
    modalcont.style.display="flex"
   }else{
    modalcont.style.display="none"
   }
})
modalcont.addEventListener("keydown" ,(e) => {
   let  key=e.key;
    if(key=="Shift"){
      createTicket(modalPrioritycolor,textareacont.value,shortid());
      modalcont.style.display="none";
      addflag=false;
      textareacont.value="";
   }
})

function createTicket( ticketcolor,tickettask,ticketID){
    let ticketcont=document.createElement("div");
    ticketcont.setAttribute("class","ticket-conta");
    ticketcont.setAttribute("purpose","remove");
   ticketcont.innerHTML=  `
        <div class="ticket-cont" purpose="remove">
        <div class="ticket-color ${ticketcolor}"></div>
        <div class="ticket-id">${ticketID}</div>
        <div class="task-area">
        ${tickettask}
        </div>
        <div class="ticket-lock">
            <span class="material-icons ">lock</span>
        </div>
      </div>
        `;
        maincont.appendChild(ticketcont);
        let ticketLock=document.querySelector(".ticket-lock");
        
       
        
}
maincont.addEventListener("click",(e)=>{
   let target=e.target
   console.log(e);
   if(e.path[2]==null){
      return;
   }
//   Lock and Unlock Feature on which ticket can be editable
   if((target.innerHTML=="lock"||target.innerHTML=="lock_open")){
              if(target.innerHTML=="lock"){
               target.innerHTML="lock_open"
                e.path[2].setAttribute("purpose","edit");
               e.path[2].querySelector(".task-area").setAttribute("contenteditable","true");
              }else{
               target.innerHTML="lock"
                e.path[2].setAttribute("purpose","remove");
               e.path[2].querySelector(".task-area").setAttribute("contenteditable","false");
              }
            
   }else if(e.path[2].querySelector(".material-icons").innerHTML!="lock_open"){
       // remove the ticket
      console.log(e.path[2].getAttribute("purpose"))
      if( e.path[2].getAttribute("purpose")=="remove"){
      removeTicket(e.path[2],e.path[2].querySelector(".ticket-id").innerHTML);
      }
   }

   
});
function removeTicket(ticket,id){
   if(removeflag==true){
      let cnfrm=confirm("Do you Want to delete the ticket");
     if(!cnfrm){
      return;
     }
     let divTBR
     for(let i=0;i<maincont.children.length;i++){
      let div=maincont.children[i];
      
        if(div.querySelector(".ticket-id").innerHTML==id){
           divTBR=div;
           break;
        }
        
     }
     console.log(divTBR)
   console.log(ticket);
     maincont.removeChild(divTBR);
   }
}


