class Adress {
  basketAdress() {
    basketBlock.setAttribute("style", "display: none;");
    document
      .querySelector(".totalPriceBlock")
      .setAttribute("style", "display: none;");
    document.querySelector(".basketWord").innerHTML = "Адрес доставки";
    for (let i = 1; i <= 3; i++) {
      document.querySelector(`.goodsBuy${i}`).disabled = true;
      document.querySelector(`.btnminus${i}`).disabled = true;
      document.querySelector(`.btnplus${i}`).disabled = true;
      document.querySelector(`.form${i}`).disabled = true;
    }

    //Отрисую блок адреса доставки
    let adressBlock = document.createElement("div");
    adressBlock.classList.add("adressBlock");

    let adressWrapper1 = document.createElement("div");
    adressWrapper1.classList.add("adressWrapper1");
    let adressWrapper2 = document.createElement("div");
    adressWrapper2.classList.add("adressWrapper2");
    let adressWrapper3 = document.createElement("div");
    adressWrapper3.classList.add("adressWrapper3");

    let adressSpan1 = document.createElement("span");
    adressSpan1.classList.add("lead", "adresSpan1");

    let adressSpan2 = document.createElement("span");
    adressSpan2.classList.add("lead", "adresSpan2");

    let adressSpan3 = document.createElement("span");
    adressSpan3.classList.add("lead", "adresSpan3");

    let adressForm1 = document.createElement("input");
    adressForm1.classList.add("adressForm1");

    let adressForm2 = document.createElement("input");
    adressForm2.classList.add("adressForm2");

    let adressForm3 = document.createElement("input");
    adressForm3.classList.add("adressForm3");

    let adressbtn = document.createElement("button");
    adressbtn.classList.add("adressBtn", "btn", "btn-outline-secondary");
    adressbtn.innerHTML = "Продолжить оформление";
    adressbtn.setAttribute("onclick", "mainAdress.basketComment();");

    document.querySelector(".basketWord").after(adressBlock);

    adressBlock.appendChild(adressWrapper1);
    adressSpan1.innerHTML = "Введите ваше имя";
    adressForm1.setAttribute("placeholder", "Александр");
    adressWrapper1.appendChild(adressSpan1);
    adressWrapper1.appendChild(adressForm1);

    adressBlock.appendChild(adressWrapper2);
    adressSpan2.innerHTML = "Введите ваш телефон";
    adressForm2.setAttribute("placeholder", "+7(955)123-45-67");
    adressWrapper2.appendChild(adressSpan2);
    adressWrapper2.appendChild(adressForm2);

    adressBlock.appendChild(adressWrapper3);
    adressSpan3.innerHTML = "Введите вашу почту";
    adressForm3.setAttribute("placeholder", "email@email.com");
    adressWrapper3.appendChild(adressSpan3);
    adressWrapper3.appendChild(adressForm3);
    adressWrapper3.appendChild(adressbtn);
  }
  basketComment() {
    //Если валидация прошла успешно, отрисую форму комментария
    let drawComment = () => {
      userName = document.querySelector(".adressForm1").value;
      userSecName = document.querySelector(".adressForm2").value;
      userAdress = document.querySelector(".adressForm3").value;

      document.querySelector(".adressBlock").remove();
      document.querySelector(".basketWord").innerHTML =
        "Дополнительный комментарий (Необязательно)";

      let commentBlock = document.createElement("div");
      commentBlock.classList.add("commentBlock");

      let commentForm = document.createElement("textarea");
      commentForm.classList.add("form-control", "commentForm");
      commentForm.setAttribute("rows", "4");

      let commentBtn = document.createElement("button");
      commentBtn.classList.add("btn", "btn-outline-secondary", "commentBtn");
      commentBtn.setAttribute("onclick", "mainAdress.basketResult();");
      commentBtn.innerHTML = "Закончить оформление заказа";

      document.querySelector(".basketWord").after(commentBlock);
      commentBlock.appendChild(commentForm);
      commentBlock.appendChild(commentBtn);
    };

    let clearNotice = () => {
      let j = 0;
      while (j < 3) {
        text[j + 3].classList.remove("Ahtung");
        ++j;
      }
    };

    //Валидация форм
    let text = [
      document.querySelector(".adressForm1").value,
      document.querySelector(".adressForm2").value,
      document.querySelector(".adressForm3").value,
      document.querySelector(".adressForm1"),
      document.querySelector(".adressForm2"),
      document.querySelector(".adressForm3"),
    ];

    let regEmail = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2,6})$/i;
    let regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    let regName = /^[А-Яа-я]+$/;

    clearNotice();

    if (regName.test(text[0]) === false) {
      text[3].classList.add("Ahtung");
      alert("Имя не введено, или введено неправильно");
      return;
    }
    if (regPhone.test(text[1]) === false) {
      text[4].classList.add("Ahtung");
      alert("Телефон не введен, или введен неправильно");
      return;
    }
    if (regEmail.test(text[2]) === false) {
      text[5].classList.add("Ahtung");
      alert("Почта не введена, или введена неправильно");
      return;
    }
    if (
      regName.test(text[0]) &&
      regPhone.test(text[1]) &&
      regEmail.test(text[2])
    ) {
      drawComment();
      return;
    }
  }
  basketResult() {
    userComment = document.querySelector(".commentForm").value;

    document.querySelector(".commentBlock").remove();
    document.querySelector(".basketWord").innerHTML = "Ваш заказ";

    basketBlock.setAttribute("style", "display: flex;");
    document
      .querySelector(".totalPriceBlock")
      .setAttribute("style", "display: block;");

    if (document.querySelector(".basketDeleteItemchair") != null) {
      document
        .querySelector(".basketDeleteItemchair")
        .setAttribute("style", "display: none;");
      document
        .querySelector(".basketBtnPluschair")
        .setAttribute("style", "display: none;");
      document
        .querySelector(".basketBtnMinuschair")
        .setAttribute("style", "display: none;");
      document.querySelector(".basketInputchair").disabled = true;
    }
    if (document.querySelector(".basketDeleteItemtable") != null) {
      document
        .querySelector(".basketDeleteItemtable")
        .setAttribute("style", "display: none;");
      document
        .querySelector(".basketBtnPlustable")
        .setAttribute("style", "display: none;");
      document
        .querySelector(".basketBtnMinustable")
        .setAttribute("style", "display: none;");
      document.querySelector(".basketInputtable").disabled = true;
    }
    if (document.querySelector(".basketDeleteItemlamp") != null) {
      document
        .querySelector(".basketDeleteItemlamp")
        .setAttribute("style", "display: none;");
      document
        .querySelector(".basketBtnPluslamp")
        .setAttribute("style", "display: none;");
      document
        .querySelector(".basketBtnMinuslamp")
        .setAttribute("style", "display: none;");
      document.querySelector(".basketInputlamp").disabled = true;
    }
    document.querySelector(".continueBtn").remove();

    let endBlock = document.createElement("div");
    endBlock.classList.add("endBlock");

    let endSpan1 = document.createElement("span");
    endSpan1.classList.add("lead", "endSpan1");
    let endSpan2 = document.createElement("span");
    endSpan2.classList.add("lead", "endSpan2");
    let endSpan3 = document.createElement("span");
    endSpan3.classList.add("lead", "endSpan3");
    let endSpan4 = document.createElement("span");
    endSpan4.classList.add("lead", "endSpan4");

    document.querySelector(".totalPriceBlock").after(endBlock);
    endSpan1.innerHTML = `Имя: ${userName}`;
    endBlock.appendChild(endSpan1);
    endBlock.appendChild(document.createElement("br"));

    endSpan2.innerHTML = `Номер телефона: ${userSecName}`;
    endBlock.appendChild(endSpan2);
    endBlock.appendChild(document.createElement("br"));

    endSpan3.innerHTML = `Электронная почта: ${userAdress}`;
    endBlock.appendChild(endSpan3);
    endBlock.appendChild(document.createElement("br"));

    if (userComment != "") {
      endSpan4.innerHTML = `Дополнительный комментарий: \n${userComment}`;
      endBlock.appendChild(endSpan4);
    }
  }
}