import netlifyIdentity from 'netlify-identity-widget';

netlifyIdentity.init();

// netlifyIdentity.open(); // open the modal
// netlifyIdentity.open('login'); // open the modal to the login tab
// netlifyIdentity.open('signup'); // open the modal to the signup tab

netlifyIdentity.on('init', user => console.log('init', user));
netlifyIdentity.on('login', user => console.log('login', user));
netlifyIdentity.on('logout', () => console.log('Logged out'));
netlifyIdentity.on('error', err => console.error('Error', err));
netlifyIdentity.on('open', () => console.log('Widget opened'));
netlifyIdentity.on('close', () => console.log('Widget closed'));

// // Unbind from events
// netlifyIdentity.off('login'); // to unbind all registered handlers
// netlifyIdentity.off('login', handler); // to unbind a single handler

export default netlifyIdentity ;