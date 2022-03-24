import './styles/styles.scss'

const btn = document.getElementById('openModalBtn');
const modal = document.querySelector('.modal')
const form = document.getElementById('contactForm')
const formErrorText = document.querySelector('.errorText')


const openForm = () => {
    modal.classList.add('active')
    document.body.style.overflow = 'hidden';
}

const closeForm = () => {
    document.body.style.overflow = 'auto'
    modal.classList.remove('active') 
}

const getValues = () => {
    const fullName = form.fullName.value;
    const email = form.email.value;
    const message = form.message.value;
    return {fullName, email, message}
}

const clearValues = () => {
    form.fullName.value = '';
    form.email.value = '';
    form.message.value = '';
}


btn.addEventListener('click', openForm) 
modal.addEventListener('click', closeForm);



form.addEventListener('click', (e) => {
    e.stopPropagation();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validate()){
        const params = getValues()
        formErrorText.classList.remove('active')
        fetch('/example.api', {method: 'post', body: JSON.stringify(params)})
        clearValues();
        closeForm();
    } else{
        formErrorText.classList.add('active')
    };
})

function validate() {
    if(!form.fullName.value){
        form.fullName.classList.add('invalid')
    }else{
        form.fullName.classList.remove('invalid')
    }
    if(!form.email.value){
        form.email.classList.add('invalid')
    }else{
        form.email.classList.remove('invalid')
    }
    if(!form.message.value){
        form.message.classList.add('invalid')
    }else{
        form.message.classList.remove('invalid')
    }
    return form.fullName.value && form.email.value && form.message.value;
}


