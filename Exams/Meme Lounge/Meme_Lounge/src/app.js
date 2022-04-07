import page from '../node_modules/page/page.mjs';
import { logout } from './api/user.js';
import { addRender } from './middlewares/render.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailPage } from './views/detail.js';
import { editPage } from './views/edit.js';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
//import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';

page(addRender);

page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailPage);
page('/profile', profilePage);

page('/logout', onLogout);

page.start();

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}