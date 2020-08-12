function draw(){
  let table = document.createElement('table');
  let flag = true;
  
  let trr = document.createElement('tr');
  let letters = [' ','a','b','c','d','e','f','g','h'];
  
  //создаем ячейки
  for(let i = 0; i<8; i++){
      let tr = document.createElement('tr');
      
      //ячейки для цифр
      let tdd = document.createElement('td');
      tdd.style.width = '50px';
      tdd.style.height = '50px';
      tdd.innerHTML = 1 + i;
      tr.appendChild(tdd);
      
      for(let j=0; j<8; j++){
          
          if(j==0)
              flag=!flag;
          
          let td = document.createElement('td');
         
          if(flag){
              td.style.background='black';    
          }else
              td.style.background='white';    
              
          tr.appendChild(td);
          flag=!flag;
      }
      table.appendChild(tr);
  }
  
  //добавим буквы
  for(let k = 0; k<9; k++){
      
      let td = document.createElement('td');
      td.style.background='white';
      td.innerHTML=letters[k];
      
      trr.appendChild(td);
      
  }
  table.appendChild(trr);
  
  document.body.appendChild(table);
}

draw();