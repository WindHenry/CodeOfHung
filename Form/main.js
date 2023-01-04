const Form = document.querySelector('.main_form');
const Cv = document.querySelector('.container');
const Btn = document.querySelector('.btn_sm');
const editCV = document.querySelector('.editBtn-cv');



// Form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     Cv.classList.add("active");
//     Form.classList.add("hide");
//     Form.classList.remove('overlay')

// });


editCV.addEventListener("click", () => {

   // Cv.classList.remove("active");
    Form.classList.remove("hide");
    Form.classList.add('overlay');
    
});


//Đối tượng Validator
function Validator (options){
    var selectorRules = {};
    //Ham validate
    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = inputElement.parentElement.querySelector('.form_message');
        var rules = selectorRules[rule.selector];
        
        for(var i = 0; i < rules.length ; ++i){
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
            if(errorMessage){
                // errorElement.style.color = 'red';
                errorElement.innerText = errorMessage;
                inputElement.parentElement.classList.add('invalid');
            }else {
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid');
            } 

        return !errorMessage;
    }
    //Lay element cua form can validate
    var formElement = document.querySelector(options.form);
    if(formElement){

        formElement.onsubmit = function (e){
            e.preventDefault(); 
            var isFormValid = true;
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            })

            if (isFormValid) {
                Cv.classList.add("active");
                Form.classList.add("hide");
                Form.classList.remove('overlay')
            }
        }
        //Lap qua moi rule roi xu ly
        options.rules.forEach(function (rule){
            //Luu lai cac rule
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }else {
                selectorRules[rule.selector] = [rule.test]
            }
            // console.log(selectorRules[rule.selector])
            // selectorRules[rule.selector] = rule.test;
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement) { 
                //Xu ly truong hop blur ra ngoai
                inputElement.onblur = function () {
                     validate(inputElement, rule)
                }
                //Xy ly moi khi nguoi dung nhap
                inputElement.oninput = function (){
                    var errorElement = inputElement.parentElement.querySelector('.form_message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
        // console.log(selectorRules)
    }
}
//Định nghĩa rules
//Nguyen tac cua cac rule
//1. Khi co loi => message loi
//2. Khi hop le => undefined
Validator.isRequired = function (selector, message){
    return {
        selector: selector,
        test: function (value){
            return value.trim() ? undefined : message ||"Please enter this field!";
        }
    }
}
Validator.isEmail = function (selector){
    return {
        selector: selector,
        test: function (value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'This field must be email';
        }
    }
}
Validator.isPhonenumber = function (selector){
    return{
        selector: selector,
        test: function (value){
            var regex = /^\d{10}$/;
            return regex.test(value) ? undefined : 'This is not a phone number';
        }
    };
}
