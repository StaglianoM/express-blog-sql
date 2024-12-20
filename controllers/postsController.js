const posts = require("../data/posts.js");
let lastIndex = posts.at(-1).id


// Index
function index(req, res) {
    console.log('Lista dei post');
    const publishedPosts = posts.filter(post => post.published);
    res.json(publishedPosts);
}

// Show
function show(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    console.log(`Dettagli del post con id: ${id}`);

    if (!post) {
        return res.status(404).json({
            message: `Post con id ${id} non trovato.`,
        });
    }

    res.json(post);
}


// Post
function store(req, res) {
    const { title, slug, content, image, tags, published = true } = req.body;

    // Valido i campi obbligatori
    if (!title || !slug || !content || !tags) {
        return res.status(400).json({
            message: 'Parametri non validi',
        });
    }

    // Valido l'URL dell'iimmagine
    if (!image || typeof image !== 'string') {
        return res.status(400).json({
            message: 'URL immagine non valido o mancante',
        });
    }

    // Se l'URL dell'immagine non inizia con http://, https://, lo faccio partire da una stringa vuota ecc
    if (!image.startsWith('http://') && !image.startsWith('https://')) {
        return res.status(400).json({
            message: 'L\'URL dell\'immagine deve essere completo (iniziare con http:// o https://).',
        });
    }

    // Creazione del nuovo post
    lastIndex++;
    const newPost = { id: lastIndex, title, slug, content, image, tags, published };

    console.log('Nuovo post creato:', newPost);

    posts.push(newPost);

    res.status(201).json(newPost);
}


// Update
function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((element) => element.id === id);

    if (!post) {
        return res.status(404).json({
            error: "Post non trovato",
            message: "Il post con id specificato non esiste.",
        });
    }

    const { title = post.title, slug = post.slug, content = post.content, image = post.image, tags = post.tags } = req.body;

    post.title = title;
    post.slug = slug;
    post.content = content;
    post.image = image;
    post.tags = tags;

    res.json(post);
}


// Patch
function modify(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({
            error: "Post non trovato",
            message: "Il post con id specificato non esiste.",
        });
    }

    const { title, slug, content, image, tags, published } = req.body;

    if (title) post.title = title;
    if (slug) post.slug = slug;
    if (content) post.content = content;
    if (image) post.image = image;
    if (tags) post.tags = tags;
    if (published !== undefined) post.published = published;

    res.json({
        message: "Post aggiornato parzialmente con successo.",
        post,
    });
}

//Destroy
function destroy(req, res) {
    const id = parseInt(req.params.id);
    console.log(`Elimino il post con id: ${id}`);

    const postsIndex = posts.findIndex((post) => post.id === id);

    if (postsIndex === -1) {
        console.log(`Post con id ${id} non trovato.`);
        return res.status(404).json({
            error: 'Post non trovato',
            message: 'Il post non è stato trovato.',
        });
    }

    const removedPost = posts.splice(postsIndex, 1);

    console.log('Lista dei post rimanenti:', posts);

    res.json({
        message: `Post con id ${id} eliminato con successo.`,
        removedPost,
    });
}




module.exports = { index, show, store, update, modify, destroy }

