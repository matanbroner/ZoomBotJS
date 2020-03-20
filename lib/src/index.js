import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';

var head = document.head;

var boostrapLink = document.createElement("link");
boostrapLink.rel = "stylesheet";
boostrapLink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

var fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,600,700,800i&display=swap";

head.appendChild(boostrapLink);
head.appendChild(fontLink);
// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );

// Now we can render our application into it
render( <App />, document.getElementById('root') );
