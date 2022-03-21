import { html } from './../../node_modules/lit-html/lit-html.js';
import { ifDefined } from './../../node_modules/lit-html/directives/if-defined.js'

export let allFormsTemplate = (forms) => html`
    ${forms.map(f => formTemplate(f))}
`

export let formTemplate = (form) => html`
<form class=${ifDefined(form.class)} id=${form.id}>
        ${form.type === 'edit'
        ? html`<input type="hidden" name="id">`
        : ''}
        
        <h3>${form.title}</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value=${form.submitText}>
    </form>
`

export let bookTemlate = (book) => html`
<tr class="book" data-id=${book.id}>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>
</tr>
`

export let tableTemplate = (books) => html`
<table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
           ${books.map(b=>bookTemlate(b))}
        </tbody>
</table>
`


export let bookLibraryTemplate=(books,forms)=>html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
    ${tableTemplate(books)}
    ${allFormsTemplate(forms)}
`