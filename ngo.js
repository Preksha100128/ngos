const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
const ngos = [
    { id: 1, name: "NGO 1", cause: "Education" },
    { id: 2, name: "NGO 2", cause: "Health" },
    { id: 3, name: "NGO 3", cause: "Environment" },
    { id: 4, name: "NGO 4", cause: "Poverty" },
    { id: 5, name: "NGO 5", cause: "Animal welfare" },
];

app.get("/ngos", (req, res) => {
res.json(ngos);
});

// POST a new NGO
app.post('/ngos', (req, res) => {
const ngo = req.body;
ngo.id = ngos.length + 1;
ngos.push(ngo);
res.status(201).json({ message: "NGO added", ngo });
});

app.put('/ngos/:id', (req, res) => {
const ngo = ngos.find(n => n.id === parseInt(req.params.id));
if (!ngo) {
res.status(404).send('The NGO with the given ID was not found.');
}
ngo.name = req.body.name;
ngo.address = req.body.address;
res.json(ngo);
});

app.delete("/ngos/:id", (req, res) => {
const id = req.params.id;
ngos.forEach((ngo, index) => {
if (ngo.id == id) {
ngos.splice(index, 1);
}
});
res.json({ message: `NGO ${id} deleted` });
});
const port = 3000;
app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});