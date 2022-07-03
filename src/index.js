// Test import of styles
import '@/styles/index.scss'

import Ukiyo from "ukiyojs";

import Headroom from "headroom.js";

import emailjs from '@emailjs/browser';

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const nav = document.querySelector('.navigation')
const options = {
    offset: {
        up: 0,
        down: 70,
    },
    tolerance: {
        up: 10,
        down: 0,
    },
    classes: {
        // when element is initialised
        initial : "navigation",
        // when scrolling up
        pinned : "navigation--pinned",
        // when scrolling down
        unpinned : "navigation--unpinned",
    }
}

const headroom = new Headroom(nav, options)
headroom.init()

const parallaxEle = document.querySelectorAll('.hero-bg');
const parallaxOptions = {
    // scaling factor
    scale: 1.1,
    // animation speed
    speed: 3,
    // apply will-change: transform to the parallax element
    willChange: true,
}
parallaxEle.forEach((ele) => {
    new Ukiyo(ele, parallaxOptions)
})

const form = document.querySelector('.contact-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const loader = '<div class="backdrop"><div class="loading"></div></div>'
    document.querySelector('#root').insertAdjacentHTML('afterbegin', loader)
    const loaderEle = document.querySelector('.backdrop')
    
    emailjs.sendForm(process.env.SERVICE_CODE, process.env.TEMPLATE_CODE, e.target, process.env.PUBLIC_CODE)
      .then((result) => {
          console.log(result.text);
          loaderEle.remove()
          e.target.reset()
          Swal.fire({
            title: 'Success!',
            text: 'Your message was sent successfully! We will contact you soon...',
            icon: 'success',
            confirmButtonText: 'OK'
          })
      }, (error) => {
          console.log(error.text);
          loaderEle.remove()
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong :( Try again later',
            icon: 'error',
            confirmButtonText: 'OK'
          })
      });
})