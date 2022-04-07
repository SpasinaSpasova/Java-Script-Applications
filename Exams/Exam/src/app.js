import page from '../node_modules/page/page.mjs';
import { addRender } from './middlewares/render.js';
import { dashboardPage } from './views/dashboard.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/user.js';
import { createPage } from './views/create.js';
import { detailPage } from './views/detail.js';
import { editPage } from './views/edit.js';

page(addRender);
page('/', homePage);
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/create', createPage);
page('/details/:id', detailPage);
page('/edit/:id', editPage);


page.start();

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}