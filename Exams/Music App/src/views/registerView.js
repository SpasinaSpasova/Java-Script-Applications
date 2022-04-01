import { html } from '../../node_modules/lit-html/lit-html.js'
import * as userService from '../services/userService.js';


const registerTemplate = (submitHendler) => html`
<section id="registerPage">
    <form @submit=${submitHendler} method="POST">
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export const registerView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData);
        const confPass = formData.get('conf-pass');

        if (email == '' || password == '') {
            alert('Invalid input');
        }

        if (confPass !== password) {
            alert('Pass missmatch!');
            return;
        }
        userService.register(email, password)
            .then(() => {
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert(err);
            });
    }
    ctx.render(registerTemplate(submitHandler));
}