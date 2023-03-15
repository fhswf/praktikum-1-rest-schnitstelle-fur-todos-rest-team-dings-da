import express from 'express';

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();

/**
 * Liste aller ToDos. 
 * Wird später durch Datenbank ersetzt!
 */
let TODOS = [
    {
        "id": 1671056616571,
        "title": "Übung 4 machen",
        "due": "2022-11-12T00:00:00.000Z",
        "status": 0
    },
    {
        "id": 1671087245763,
        "title": "Für die Klausur Webentwicklung lernen",
        "due": "2023-01-14T00:00:00.000Z",
        "status": 2
    },
];



// Your code here
const port = 3000

app.use(express.json());

app.get('/todos', (req, res) => {
    
    res.send(TODOS)
})

app.get('/todos/:id', (req, res) => {
    let ret = 0; 
    for(let i = 0; i<TODOS.length; i++)
    {
        if(TODOS[i].id == req.params.id)
        {
            ret = TODOS[i];
        }
    }
    if(ret == 0)
    {
        ret = "NOT Found";
    }
    res.send(ret);
})


app.post('/todos', (req, res) => {
    let reqjson = req.body;
    reqjson.id  = getID();
    TODOS.push(reqjson);
    res.send(reqjson);

})

/*
app.put('/todos/:id', (req, res) => {
    let reqjson = req.body;
    let id = req.params.id;

    let at = 0;
    let found = false;
    for(let i = 0; i < TODOS.length; i ++)
    {
        if(TODOS[i].id = id)
        {
            TODOS[i] = reqjson;
            TODOS[i].id = id;
            at = i;
            found = true;
        }
    }

    let send  = "ERROR NOT FOUND"
    if(found)
    {
        send = TODOS[at]
    }

    res.send(send);

})
*/



app.listen(port, () => {
    console.log('Listening Port ${port} ')
})


function getID()
{
    let doubleID;
    let ID;
    do
    {
        ID = Math.floor( Math.random() * 8999999999999) + 1000000000000;
        doubleID = false;
        for(let i = 0; i < TODOS.length; i++)
        {
            if(TODOS[i].id == ID)
            {
                doubleID  = true;
            }
        }


    }
    while(doubleID)
    return ID;
}

